import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductInput } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Order } from "../orders/entities/order.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
export declare class ProductsService {
    private readonly productRepo;
    private readonly orderRepo;
    private readonly vehicleRepo;
    private readonly logger;
    constructor(productRepo: Repository<Product>, orderRepo: Repository<Order>, vehicleRepo: Repository<Vehicle>);
    create(input: CreateProductInput): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, input: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<boolean>;
    private assignProductsToVehicles;
    private calculateVehicleLoad;
}
