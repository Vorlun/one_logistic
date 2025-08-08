// vehicle.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Company } from "../../companies/entities/company.entity";
import { Order } from "../../orders/entities/order.entity";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.vehicles, { nullable: false })
  driver: User;

  @ManyToOne(() => Company, (company) => company.vehicles, { nullable: false })
  company: Company;

  @Column({ length: 20 })
  plate_number: string;

  @Column({ length: 100 })
  model: string;

  @Column({ length: 50 })
  type: string; // qaysi mahsulot turiga mo'ljallangan

  @Column({ type: "float" })
  capacity_kg: number;

  @Column({ type: "float" })
  volume_m3: number;

  @Column({ length: 20 })
  status: string; // available, busy, maintenance

  @ManyToMany(() => Order, (order) => order.vehicles)
  @JoinTable({
    name: "order_vehicles",
    joinColumn: { name: "vehicle_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "order_id", referencedColumnName: "id" },
  })
  orders: Order[];
}
