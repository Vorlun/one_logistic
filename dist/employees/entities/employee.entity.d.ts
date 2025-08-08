import { User } from "../../users/entities/user.entity";
import { Company } from "../../companies/entities/company.entity";
export declare class Employee {
    id: number;
    company: Company;
    user: User;
    position?: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
