import { AddressesService } from "./address.service";
import { CreateAddressInput } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(input: CreateAddressInput): Promise<Address>;
    findAll(): Promise<Address[]>;
    findOne(id: number): Promise<Address>;
    update(id: number, input: UpdateAddressDto): Promise<Address>;
    remove(id: number): Promise<boolean>;
}
