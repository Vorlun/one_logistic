import { Role } from "../../roles/entities/role.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
export declare class User {
    id: number;
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    is_active: boolean;
    refresh_token?: string;
    reset_token?: string;
    is_verified: boolean;
    activation_link: string | null;
    role: Role;
    vehicles: Vehicle[];
    role_id: number;
    created_at: Date;
    updated_at: Date;
}
