import { RegionsService } from "./regions.service";
import { CreateRegionInput } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./entities/region.entity";
export declare class RegionsController {
    private readonly regionsService;
    constructor(regionsService: RegionsService);
    create(input: CreateRegionInput): Promise<Region>;
    findAll(): Promise<Region[]>;
    findOne(id: number): Promise<Region>;
    update(id: number, input: UpdateRegionDto): Promise<Region>;
    remove(id: number): Promise<boolean>;
}
