import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Product } from "../products/entities/product.entity";
import { User } from "../users/entities/user.entity";
import { Address } from "../address/entities/address.entity";
import { Route } from "../routes/entities/route.entity";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(Route) private readonly routeRepo: Repository<Route>
  ) {}

  // -------------------- CREATE --------------------
  async create(input: CreateOrderInput): Promise<Order> {
    const client = await this.userRepo.findOneByOrFail({ id: input.client_id });
    const dispatcher = await this.userRepo.findOneByOrFail({
      id: input.dispatcher_id,
    });
    const pickup_address = await this.addressRepo.findOneByOrFail({
      id: input.pickup_address_id,
    });
    const delivery_address = await this.addressRepo.findOneByOrFail({
      id: input.delivery_address_id,
    });
    const route = await this.routeRepo.findOneByOrFail({ id: input.route_id });

    const order = this.orderRepo.create({
      client,
      dispatcher,
      pickup_address,
      delivery_address,
      route,
      status: input.status,
      total_price: input.total_price,
      currency: input.currency,
      vehicles: [],
      products: [],
    });

    // Agar vehicle_ids kelgan bo‘lsa qo‘shib qo‘yamiz
    if (input.vehicle_ids?.length) {
      const vehicles = await this.vehicleRepo.findBy({
        id: In(input.vehicle_ids),
      });
      order.vehicles = vehicles;
    }

    const savedOrder = await this.orderRepo.save(order);
    this.logger.log(`Order created: ID ${savedOrder.id}`);
    return savedOrder;
  }

  // -------------------- READ --------------------
  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: [
        "client",
        "dispatcher",
        "pickup_address",
        "delivery_address",
        "route",
        "vehicles",
        "products",
      ],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: [
        "client",
        "dispatcher",
        "pickup_address",
        "delivery_address",
        "route",
        "vehicles",
        "products",
      ],
    });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  // -------------------- UPDATE --------------------
  async update(id: number, input: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, input);

    if (input.vehicle_ids?.length) {
      const vehicles = await this.vehicleRepo.findBy({
        id: In(input.vehicle_ids),
      });
      order.vehicles = vehicles;
    }

    return this.orderRepo.save(order);
  }

  // -------------------- DELETE --------------------
  async remove(id: number): Promise<boolean> {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    return true;
  }

  // -------------------- BUSINESS LOGIC --------------------
  /**
   * Avtomatik transportga productlarni joylashtirish
   */
  async assignProductsToVehicles(orderId: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ["products", "vehicles"],
    });
    if (!order) throw new NotFoundException("Order not found");

    if (!order.products.length) {
      throw new BadRequestException("Order has no products");
    }

    // Product umumiy og‘irlik va hajmi
    const totalWeight = order.products.reduce(
      (sum, p) => sum + p.weight_kg * p.quantity,
      0
    );
    const totalVolume = order.products.reduce(
      (sum, p) => sum + p.volume_m3 * p.quantity,
      0
    );
    const productType = order.products[0].type;

    // Mos transportlar
    let vehicles = await this.vehicleRepo.find({
      where: { type: productType, status: "available" },
      relations: ["orders", "orders.products"],
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

      const load = await this.calculateVehicleLoad(vehicle);
      const availableWeight = vehicle.capacity_kg - load.weight;
      const availableVolume = vehicle.volume_m3 - load.volume;

      if (availableWeight <= 0 || availableVolume <= 0) continue;

      order.vehicles.push(vehicle);
      remainingWeight -= availableWeight;
      remainingVolume -= availableVolume;
    }

    if (remainingWeight > 0 || remainingVolume > 0) {
      throw new BadRequestException("Not enough vehicle capacity");
    }

    return this.orderRepo.save(order);
  }

  private async calculateVehicleLoad(
    vehicle: Vehicle
  ): Promise<{ weight: number; volume: number }> {
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
