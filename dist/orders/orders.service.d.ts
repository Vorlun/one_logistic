import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Product } from "../products/entities/product.entity";
import { User } from "../users/entities/user.entity";
import { Address } from "../address/entities/address.entity";
import { Route } from "../routes/entities/route.entity";
export declare class OrdersService {
    private readonly orderRepo;
    private readonly vehicleRepo;
    private readonly productRepo;
    private readonly userRepo;
    private readonly addressRepo;
    private readonly routeRepo;
    private readonly logger;
    constructor(orderRepo: Repository<Order>, vehicleRepo: Repository<Vehicle>, productRepo: Repository<Product>, userRepo: Repository<User>, addressRepo: Repository<Address>, routeRepo: Repository<Route>);
    create(input: CreateOrderInput): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, input: UpdateOrderDto): Promise<Order>;
    remove(id: number): Promise<boolean>;
    assignProductsToVehicles(orderId: number): Promise<Order>;
    private calculateVehicleLoad;
}
