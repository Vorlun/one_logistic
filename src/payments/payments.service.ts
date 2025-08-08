import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./entities/payment.entity";
import { CreatePaymentInput } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>
  ) {}

  async create(input: CreatePaymentInput): Promise<Payment> {
    // 1. Orderni tekshirish
    const order = await this.orderRepo.findOne({
      where: { id: input.order_id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${input.order_id} not found`);
    }

    // 2. Agar total_price 0 yoki kichik bo'lsa, to'lovga ruxsat bermaymiz
    if (order.total_price <= 0) {
      throw new BadRequestException("Order already fully paid");
    }

    // 3. Agar to'lov miqdori order.total_price dan katta bo'lsa ham ogohlantirish
    if (input.amount > order.total_price) {
      throw new BadRequestException(
        `Payment amount (${input.amount}) exceeds remaining order total_price (${order.total_price})`
      );
    }

    // 4. Payment yaratish
    const payment = this.paymentRepo.create({
      amount: input.amount,
      method: input.method,
      status: input.status,
      order: order,
    });

    // 5. Save payment
    const savedPayment = await this.paymentRepo.save(payment);

    // 6. Order total_price ni kamaytirish
    order.total_price -= input.amount;

    // 7. Agar total_price 0 yoki kichik bo'lsa, statusni o'zgartirish (masalan, 'paid')
    if (order.total_price <= 0) {
      order.total_price = 0; // manfiy bo'lmasligi uchun
      order.status = "paid";
    }

    await this.orderRepo.save(order);

    this.logger.log(
      `Payment of amount ${input.amount} added to order ${order.id}. Remaining total_price: ${order.total_price}`
    );

    return savedPayment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({ relations: ["order"] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ["order"],
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async update(id: number, input: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    // Agar amount o'zgarsa order.total_price ham o'zgaradi
    if (input.amount && input.amount !== payment.amount) {
      const order = payment.order;
      // eski summani qaytarib qo'yamiz
      order.total_price += payment.amount;
      // yangi summani ayiramiz
      if (input.amount > order.total_price) {
        throw new BadRequestException("Payment amount exceeds total price");
      }
      order.total_price -= input.amount;
      await this.orderRepo.save(order);
    }

    Object.assign(payment, input);
    const updated = await this.paymentRepo.save(payment);
    this.logger.log(`Payment updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const payment = await this.findOne(id);

    // To'lovni o'chirsak, order.total_price ni qaytaramiz
    const order = payment.order;
    order.total_price += payment.amount;
    await this.orderRepo.save(order);

    await this.paymentRepo.remove(payment);
    this.logger.log(`Payment deleted: ID ${id}`);
    return true;
  }
}
