import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { Country } from "../../countries/entities/country.entity";
import { District } from "../../districts/entities/district.entity";

@Entity("regions")
@Index(["name", "country"], { unique: false })
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Country, (c) => c.regions, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  country: Country;

  @OneToMany(() => District, (d) => d.region)
  districts: District[];
}
