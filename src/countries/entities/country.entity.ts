import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { Region } from "../../regions/entities/region.entity";

@Entity("countries")
@Index(["iso_code"], { unique: true })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  iso_code: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Region, (r) => r.country)
  regions: Region[];
}
