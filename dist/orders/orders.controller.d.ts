import { OrdersService } from "./orders.service";
import { CreateOrderInput } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(input: CreateOrderInput): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    update(id: number, input: UpdateOrderDto): Promise<Order>;
    remove(id: number): Promise<boolean>;
    assignProducts(id: number): Promise<Order>;
}
