import { Address } from "../../address/entities/address.entity";
export declare class Route {
    id: number;
    origin: Address;
    destination: Address;
    estimated_time: number;
    route_type: string;
    distance_km: number;
}
