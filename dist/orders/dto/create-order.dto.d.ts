export declare class CreateOrderInput {
    client_id: number;
    dispatcher_id: number;
    pickup_address_id: number;
    delivery_address_id: number;
    route_id: number;
    vehicle_ids: number[];
    status: string;
    total_price: number;
    currency: string;
}
