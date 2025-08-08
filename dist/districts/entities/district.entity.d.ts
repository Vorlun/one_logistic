import { Region } from "../../regions/entities/region.entity";
import { Address } from "../../address/entities/address.entity";
export declare class District {
    id: number;
    name: string;
    region: Region;
    addresses: Address[];
}
