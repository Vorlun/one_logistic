import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { Region } from "../../regions/entities/region.entity";
import { Address } from "../../address/entities/address.entity";

@Entity("districts")
@Index(["name", "region"], { unique: false })
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Region, (r) => r.districts, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  region: Region;

  @OneToMany(() => Address, (a) => a.district)
  addresses: Address[];
}
