import { Repository } from "typeorm";
import { Address } from "./entities/address.entity";
import { CreateAddressInput } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { District } from "../districts/entities/district.entity";
import { User } from "../users/entities/user.entity";
import { Building } from "../building/entities/building.entity";
export declare class AddressesService {
    private readonly addressRepo;
    private readonly districtRepo;
    private readonly userRepo;
    private readonly buildingRepo;
    private readonly logger;
    constructor(addressRepo: Repository<Address>, districtRepo: Repository<District>, userRepo: Repository<User>, buildingRepo: Repository<Building>);
    create(input: CreateAddressInput): Promise<Address>;
    findAll(): Promise<Address[]>;
    findOne(id: number): Promise<Address>;
    update(id: number, input: UpdateAddressDto): Promise<Address>;
    remove(id: number): Promise<boolean>;
}
