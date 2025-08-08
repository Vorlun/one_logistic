import { Repository } from "typeorm";
import { District } from "./entities/district.entity";
import { CreateDistrictInput } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { Region } from "../regions/entities/region.entity";
export declare class DistrictsService {
    private readonly districtRepo;
    private readonly regionRepo;
    private readonly logger;
    constructor(districtRepo: Repository<District>, regionRepo: Repository<Region>);
    create(input: CreateDistrictInput): Promise<District>;
    findAll(): Promise<District[]>;
    findOne(id: number): Promise<District>;
    update(id: number, input: UpdateDistrictDto): Promise<District>;
    remove(id: number): Promise<boolean>;
}
