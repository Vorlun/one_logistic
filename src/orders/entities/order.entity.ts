// order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Route } from "../../routes/entities/route.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Product } from "../../products/entities/product.entity";
import { Address } from "../../address/entities/address.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  client: User;

  @ManyToOne(() => User, { nullable: false })
  dispatcher: User;

  @ManyToOne(() => Address, { nullable: false })
  pickup_address: Address;

  @ManyToOne(() => Address, { nullable: false })
  delivery_address: Address;

  @ManyToOne(() => Route, { nullable: false })
  route: Route;

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.orders)
  vehicles: Vehicle[];

  @Column({ length: 20 })
  status: string; // pending, in_progress, completed, cancelled

  @Column({ type: "float" })
  total_price: number;

  @Column({ length: 10 })
  currency: string;


  @OneToMany(() => Product, (product) => product.order)
  products: Product[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
