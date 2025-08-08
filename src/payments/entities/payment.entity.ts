import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false })
  order: Order;

  @Column({ type: "float" })
  amount: number;

  @Column({ length: 50 })
  method: string; // cash, card, bank_transfer

  @Column({ length: 20 })
  status: string; // pending, paid, failed
}
