import { BuildingsService } from "./building.service";
import { CreateBuildingInput } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { Building } from "./entities/building.entity";
export declare class BuildingsController {
    private readonly buildingsService;
    constructor(buildingsService: BuildingsService);
    create(input: CreateBuildingInput): Promise<Building>;
    findAll(): Promise<Building[]>;
    findOne(id: number): Promise<Building>;
    update(id: number, input: UpdateBuildingDto): Promise<Building>;
    remove(id: number): Promise<boolean>;
}
