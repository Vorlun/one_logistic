import { DistrictsService } from "./districts.service";
import { CreateDistrictInput } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./entities/district.entity";
export declare class DistrictsController {
    private readonly districtsService;
    constructor(districtsService: DistrictsService);
    create(input: CreateDistrictInput): Promise<District>;
    findAll(): Promise<District[]>;
    findOne(id: number): Promise<District>;
    update(id: number, input: UpdateDistrictDto): Promise<District>;
    remove(id: number): Promise<boolean>;
}
