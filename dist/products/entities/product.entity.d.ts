import { Order } from "../../orders/entities/order.entity";
export declare class Product {
    id: number;
    order: Order;
    name: string;
    weight_kg: number;
    volume_m3: number;
    quantity: number;
    type: string;
    price_per: number;
}
