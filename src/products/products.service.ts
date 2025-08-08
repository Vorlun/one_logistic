import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductInput } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Order } from "../orders/entities/order.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const order = await this.orderRepo.findOne({
      where: { id: input.order_id },
      relations: ["vehicles", "products"],
    });
    if (!order) throw new NotFoundException("Order not found");

    const product = this.productRepo.create({
      ...input,
      order,
    });
    const savedProduct = await this.productRepo.save(product);

    // Assign vehicles for this order
    await this.assignProductsToVehicles(order);

    this.logger.log(`Product created and assigned: ${savedProduct.name}`);
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find({ relations: ["order"] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["order"],
    });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

  async update(id: number, input: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, input);
    const updated = await this.productRepo.save(product);

    // Recalculate vehicle assignments if needed
    const order = await this.orderRepo.findOne({
      where: { id: product.order.id },
      relations: ["vehicles", "products"],
    });
    if (order) {
      await this.assignProductsToVehicles(order);
    }

    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);

    const order = await this.orderRepo.findOne({
      where: { id: product.order.id },
      relations: ["vehicles", "products"],
    });
    if (order) {
      await this.assignProductsToVehicles(order);
    }

    return true;
  }

  private async assignProductsToVehicles(order: Order) {
    const products = order.products;
    if (!products.length) {
      this.logger.warn(`No products in order ${order.id}`);
      return;
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
      relations: ["orders", "orders.products"],
    });

    if (!vehicles.length) {
      throw new BadRequestException("No available vehicles for this type");
    }

    let remainingWeight = totalWeight;
    let remainingVolume = totalVolume;
    order.vehicles = [];

    for (const vehicle of vehicles) {
      if (remainingWeight <= 0 && remainingVolume <= 0) break;

      const load = this.calculateVehicleLoad(vehicle);
      const availableWeight = vehicle.capacity_kg - load.weight;
      const availableVolume = vehicle.volume_m3 - load.volume;

      if (availableWeight <= 0 || availableVolume <= 0) continue;

      order.vehicles.push(vehicle);
      this.logger.log(
        `Vehicle ${vehicle.plate_number} assigned to order ${order.id}`
      );

      remainingWeight -= availableWeight;
      remainingVolume -= availableVolume;
    }

    if (remainingWeight > 0 || remainingVolume > 0) {
      throw new BadRequestException(
        "Not enough vehicle capacity for all products"
      );
    }

    await this.orderRepo.save(order);
  }

  private calculateVehicleLoad(vehicle: Vehicle) {
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
