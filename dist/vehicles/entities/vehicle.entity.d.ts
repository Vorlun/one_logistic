import { User } from "../../users/entities/user.entity";
import { Company } from "../../companies/entities/company.entity";
import { Order } from "../../orders/entities/order.entity";
export declare class Vehicle {
    id: number;
    driver: User;
    company: Company;
    plate_number: string;
    model: string;
    type: string;
    capacity_kg: number;
    volume_m3: number;
    status: string;
    orders: Order[];
}
