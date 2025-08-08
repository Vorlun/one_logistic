import { Repository } from "typeorm";
import { Building } from "./entities/building.entity";
import { CreateBuildingInput } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { User } from "../users/entities/user.entity";
import { Company } from "../companies/entities/company.entity";
import { Address } from "../address/entities/address.entity";
export declare class BuildingsService {
    private readonly buildingRepo;
    private readonly userRepo;
    private readonly companyRepo;
    private readonly addressRepo;
    private readonly logger;
    constructor(buildingRepo: Repository<Building>, userRepo: Repository<User>, companyRepo: Repository<Company>, addressRepo: Repository<Address>);
    create(input: CreateBuildingInput): Promise<Building>;
    findAll(): Promise<Building[]>;
    findOne(id: number): Promise<Building>;
    update(id: number, input: UpdateBuildingDto): Promise<Building>;
    remove(id: number): Promise<boolean>;
}
