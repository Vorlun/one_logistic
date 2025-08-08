import { Order } from "../../orders/entities/order.entity";
export declare class Payment {
    id: number;
    order: Order;
    amount: number;
    method: string;
    status: string;
}
