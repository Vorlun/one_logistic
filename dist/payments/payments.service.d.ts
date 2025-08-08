import { Repository } from "typeorm";
import { Payment } from "./entities/payment.entity";
import { CreatePaymentInput } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Order } from "../orders/entities/order.entity";
export declare class PaymentsService {
    private readonly paymentRepo;
    private readonly orderRepo;
    private readonly logger;
    constructor(paymentRepo: Repository<Payment>, orderRepo: Repository<Order>);
    create(input: CreatePaymentInput): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: number): Promise<Payment>;
    update(id: number, input: UpdatePaymentDto): Promise<Payment>;
    remove(id: number): Promise<boolean>;
}
