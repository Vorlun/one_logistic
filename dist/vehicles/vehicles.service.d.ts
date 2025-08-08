import { Repository } from "typeorm";
import { Vehicle } from "./entities/vehicle.entity";
import { CreateVehicleInput } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { User } from "../users/entities/user.entity";
import { Company } from "../companies/entities/company.entity";
export declare class VehiclesService {
    private readonly vehicleRepo;
    private readonly orderRepo;
    private readonly productRepo;
    private readonly userRepo;
    private readonly companyRepo;
    private readonly logger;
    constructor(vehicleRepo: Repository<Vehicle>, orderRepo: Repository<Order>, productRepo: Repository<Product>, userRepo: Repository<User>, companyRepo: Repository<Company>);
    create(input: CreateVehicleInput): Promise<Vehicle>;
    findAll(): Promise<Vehicle[]>;
    findOne(id: number): Promise<Vehicle>;
    update(id: number, input: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: number): Promise<boolean>;
    assignOrderProductsToVehicles(orderId: number): Promise<void>;
    private calculateVehicleLoad;
}
