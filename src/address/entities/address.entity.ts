import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { District } from "../../districts/entities/district.entity";
import { Building } from "../../building/entities/building.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => District, (d) => d.addresses, {
    nullable: true,
    onDelete: "SET NULL",
  })
  district?: District | null;

  @Column({ length: 200 })
  street: string;

  @Column({ length: 50, nullable: true })
  house_number?: string;

  @Column({ length: 20, nullable: true })
  postal_code?: string;

  // latitude / longitude stored as decimal strings to avoid floating precision issues
  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  lat?: string;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  lon?: string;

  @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  user?: User | null;

  // Many-to-many with buildings (join table: building_addresses)
  @ManyToMany(() => Building, (b) => b.addresses)
  @JoinTable({
    name: "building_addresses",
    joinColumn: { name: "address_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "building_id", referencedColumnName: "id" },
  })
  buildings?: Building[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
