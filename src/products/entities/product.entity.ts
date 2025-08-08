// product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.products, { nullable: false })
  order: Order;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "float" })
  weight_kg: number;

  @Column({ type: "float" })
  volume_m3: number;

  @Column({ type: "int" })
  quantity: number;

  @Column({ length: 50 })
  type: string; // fragile, liquid, solid

  @Column({ type: "float" })
  price_per: number;
}
