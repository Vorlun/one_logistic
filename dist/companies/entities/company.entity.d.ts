import { User } from "../../users/entities/user.entity";
import { Building } from "../../building/entities/building.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
export declare class Company {
    id: number;
    name: string;
    inn: string;
    email: string;
    phone?: string;
    manager?: User | null;
    buildings: Building[];
    vehicles: Vehicle[];
    employees: Employee[];
    created_at: Date;
    updated_at: Date;
}
