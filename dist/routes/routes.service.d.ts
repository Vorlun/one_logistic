import { Repository } from "typeorm";
import { Route } from "./entities/route.entity";
import { CreateRouteInput } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";
import { Address } from "../address/entities/address.entity";
import { Order } from "../orders/entities/order.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Product } from "../products/entities/product.entity";
export declare class RoutesService {
    private readonly routeRepo;
    private readonly addressRepo;
    private readonly orderRepo;
    private readonly vehicleRepo;
    private readonly productRepo;
    private readonly logger;
    constructor(routeRepo: Repository<Route>, addressRepo: Repository<Address>, orderRepo: Repository<Order>, vehicleRepo: Repository<Vehicle>, productRepo: Repository<Product>);
    create(input: CreateRouteInput): Promise<Route>;
    findAll(): Promise<Route[]>;
    findOne(id: number): Promise<Route>;
    update(id: number, input: UpdateRouteDto): Promise<Route>;
    remove(id: number): Promise<boolean>;
    assignOrdersToVehicles(routeId: number): Promise<string>;
    private calculateVehicleLoad;
}
