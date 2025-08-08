import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Address } from "../../address/entities/address.entity";

@Entity("routes")
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Address, { nullable: false })
  origin: Address;

  @ManyToOne(() => Address, { nullable: false })
  destination: Address;

  @Column({ type: "int" })
  estimated_time: number; // minutes

  @Column({ length: 50 })
  route_type: string; // road, rail, air, sea

  @Column({ type: "float" })
  distance_km: number;
}
