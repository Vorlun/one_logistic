import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Route } from "./entities/route.entity";
import { CreateRouteInput } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";
import { Address } from "../address/entities/address.entity";
import { Order } from "../orders/entities/order.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class RoutesService {
  private readonly logger = new Logger(RoutesService.name);

  constructor(
    @InjectRepository(Route)
    private readonly routeRepo: Repository<Route>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  // ---------------- CRUD ----------------
  async create(input: CreateRouteInput): Promise<Route> {
    const origin = await this.addressRepo.findOne({
      where: { id: input.origin_id },
    });
    const destination = await this.addressRepo.findOne({
      where: { id: input.destination_id },
    });

    if (!origin || !destination) {
      throw new NotFoundException("Origin or Destination address not found");
    }

    const route = this.routeRepo.create({
      origin,
      destination,
      estimated_time: input.estimated_time,
      route_type: input.route_type,
      distance_km: input.distance_km,
    });

    const saved = await this.routeRepo.save(route);
    this.logger.log(`Route created: ID ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<Route[]> {
    return this.routeRepo.find({ relations: ["origin", "destination"] });
  }

  async findOne(id: number): Promise<Route> {
    const route = await this.routeRepo.findOne({
      where: { id },
      relations: ["origin", "destination"],
    });
    if (!route) throw new NotFoundException("Route not found");
    return route;
  }

  async update(id: number, input: UpdateRouteDto): Promise<Route> {
    const route = await this.findOne(id);

    if (input.origin_id) {
      route.origin = await this.addressRepo.findOneByOrFail({
        id: input.origin_id,
      });
    }
    if (input.destination_id) {
      route.destination = await this.addressRepo.findOneByOrFail({
        id: input.destination_id,
      });
    }

    Object.assign(route, {
      estimated_time: input.estimated_time ?? route.estimated_time,
      route_type: input.route_type ?? route.route_type,
      distance_km: input.distance_km ?? route.distance_km,
    });

    return this.routeRepo.save(route);
  }

  async remove(id: number): Promise<boolean> {
    const route = await this.findOne(id);
    await this.routeRepo.remove(route);
    return true;
  }

  // ---------------- BUSINESS LOGIC ----------------
  /**
   * Assign orders' products to available vehicles along the route
   */
  async assignOrdersToVehicles(routeId: number): Promise<string> {
    const route = await this.findOne(routeId);

    const orders = await this.orderRepo.find({
      where: { route: { id: route.id }, status: "pending" },
      relations: ["products", "vehicles"],
    });

    if (!orders.length) {
      throw new BadRequestException("No pending orders for this route");
    }

    // Get all available vehicles for this route type
    const vehicles = await this.vehicleRepo.find({
      where: { status: "available" },
      relations: ["orders", "orders.products"],
    });

    if (!vehicles.length) {
      throw new BadRequestException("No available vehicles");
    }

    for (const order of orders) {
      const totalWeight = order.products.reduce(
        (sum, p) => sum + p.weight_kg * p.quantity,
        0
      );
      const totalVolume = order.products.reduce(
        (sum, p) => sum + p.volume_m3 * p.quantity,
        0
      );

      let remainingWeight = totalWeight;
      let remainingVolume = totalVolume;

      for (const vehicle of vehicles) {
        if (remainingWeight <= 0 && remainingVolume <= 0) break;

        const load = await this.calculateVehicleLoad(vehicle.id);
        const availableWeight = vehicle.capacity_kg - load.weight;
        const availableVolume = vehicle.volume_m3 - load.volume;

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
          `Not enough vehicle capacity for order ${order.id}`
        );
      }

      order.status = "assigned";
      await this.orderRepo.save(order);
    }

    return "All orders assigned to vehicles successfully";
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
