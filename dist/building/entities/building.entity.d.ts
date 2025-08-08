import { User } from "../../users/entities/user.entity";
import { Company } from "../../companies/entities/company.entity";
import { Address } from "../../address/entities/address.entity";
import { Employee } from "../../employees/entities/employee.entity";
export declare class Building {
    id: number;
    name: string;
    type?: string;
    user?: User | null;
    company?: Company | null;
    is_active: boolean;
    addresses?: Address[];
    employees?: Employee[];
    created_at: Date;
    updated_at: Date;
}
