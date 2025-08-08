import { PaymentsService } from "./payments.service";
import { CreatePaymentInput } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./entities/payment.entity";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(input: CreatePaymentInput): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: number): Promise<Payment>;
    update(id: number, input: UpdatePaymentDto): Promise<Payment>;
    remove(id: number): Promise<boolean>;
}
