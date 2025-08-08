import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "./entities/vehicle.entity";
import { CreateVehicleInput } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { User } from "../users/entities/user.entity";
import { Company } from "../companies/entities/company.entity";

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>
  ) {}

  // -------------------- CRUD --------------------
  async create(input: CreateVehicleInput): Promise<Vehicle> {
    const exists = await this.vehicleRepo.findOne({
      where: { plate_number: input.plate_number },
    });
    if (exists) {
      throw new BadRequestException("Vehicle with this plate already exists");
    }

    const driver = await this.userRepo.findOne({
      where: { id: input.driver_id },
    });
    if (!driver) {
      throw new NotFoundException("Driver not found");
    }

    const company = await this.companyRepo.findOne({
      where: { id: input.company_id },
    });
    if (!company) {
      throw new NotFoundException("Company not found");
    }

    const vehicle = this.vehicleRepo.create({
      plate_number: input.plate_number,
      model: input.model,
      type: input.type,
      capacity_kg: input.capacity_kg,
      volume_m3: input.volume_m3,
      status: input.status,
      driver,
      company,
    });

    return this.vehicleRepo.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepo.find({
      relations: ["orders", "driver", "company"],
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findOne({
      where: { id },
      relations: ["orders", "driver", "company"],
    });
    if (!vehicle) throw new NotFoundException("Vehicle not found");
    return vehicle;
  }

  async update(id: number, input: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);

    if (input.driver_id) {
      const driver = await this.userRepo.findOne({
        where: { id: input.driver_id },
      });
      if (!driver) throw new NotFoundException("Driver not found");
      vehicle.driver = driver;
    }

    if (input.company_id) {
      const company = await this.companyRepo.findOne({
        where: { id: input.company_id },
      });
      if (!company) throw new NotFoundException("Company not found");
      vehicle.company = company;
    }

    Object.assign(vehicle, {
      plate_number: input.plate_number ?? vehicle.plate_number,
      model: input.model ?? vehicle.model,
      type: input.type ?? vehicle.type,
      capacity_kg: input.capacity_kg ?? vehicle.capacity_kg,
      volume_m3: input.volume_m3 ?? vehicle.volume_m3,
      status: input.status ?? vehicle.status,
    });

    return this.vehicleRepo.save(vehicle);
  }

  async remove(id: number): Promise<boolean> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepo.remove(vehicle);
    return true;
  }

  // -------------------- BUSINESS LOGIC --------------------
  async assignOrderProductsToVehicles(orderId: number): Promise<void> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ["products", "vehicles"],
    });
    if (!order) throw new NotFoundException("Order not found");

    const products = order.products;
    if (!products.length) {
      throw new BadRequestException("No products to assign");
    }

    const totalWeight = products.reduce(
      (sum, p) => sum + p.weight_kg * p.quantity,
      0
    );
    const totalVolume = products.reduce(
      (sum, p) => sum + p.volume_m3 * p.quantity,
      0
    );
    const productType = products[0].type;

    let vehicles = await this.vehicleRepo.find({
      where: { type: productType, status: "available" },
      relations: ["orders"],
    });

    if (!vehicles.length) {
      throw new BadRequestException(
        "No available vehicles for this product type"
      );
    }

    let remainingWeight = totalWeight;
    let remainingVolume = totalVolume;

    for (const vehicle of vehicles) {
      if (remainingWeight <= 0 && remainingVolume <= 0) break;

      const currentLoad = await this.calculateVehicleLoad(vehicle.id);

      const availableWeight = vehicle.capacity_kg - currentLoad.weight;
      const availableVolume = vehicle.volume_m3 - currentLoad.volume;

      if (availableWeight <= 0 || availableVolume <= 0) continue;

      order.vehicles.push(vehicle);
      this.logger.log(
        `Assigned vehicle ${vehicle.plate_number} to order ${order.id}`
      );

      remainingWeight -= availableWeight;
      remainingVolume -= availableVolume;
    }

    if (remainingWeight > 0 || remainingVolume > 0) {
      throw new BadRequestException(
        "Not enough vehicle capacity to carry all products"
      );
    }

    await this.orderRepo.save(order);
  }

  private async calculateVehicleLoad(
    vehicleId: number
  ): Promise<{ weight: number; volume: number }> {
    const vehicle = await this.vehicleRepo.findOne({
      where: { id: vehicleId },
      relations: ["orders", "orders.products"],
    });
    if (!vehicle) throw new NotFoundException("Vehicle not found");

    let weight = 0;
    let volume = 0;
    for (const order of vehicle.orders) {
      for (const p of order.products) {
        weight += p.weight_kg * p.quantity;
        volume += p.volume_m3 * p.quantity;
      }
    }
    return { weight, volume };
  }
}
