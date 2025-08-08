import { User } from "../../users/entities/user.entity";
import { District } from "../../districts/entities/district.entity";
import { Building } from "../../building/entities/building.entity";
export declare class Address {
    id: number;
    district?: District | null;
    street: string;
    house_number?: string;
    postal_code?: string;
    lat?: string;
    lon?: string;
    user?: User | null;
    buildings?: Building[];
    created_at: Date;
    updated_at: Date;
}
