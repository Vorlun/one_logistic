import { VehiclesService } from "./vehicles.service";
import { CreateVehicleInput } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleInput): Promise<import("./entities/vehicle.entity").Vehicle>;
    findAll(): Promise<import("./entities/vehicle.entity").Vehicle[]>;
    findOne(id: number): Promise<import("./entities/vehicle.entity").Vehicle>;
    update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<import("./entities/vehicle.entity").Vehicle>;
    remove(id: number): Promise<boolean>;
    assignOrderProductsToVehicles(orderId: number): Promise<void>;
}
