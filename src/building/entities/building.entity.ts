import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Company } from "../../companies/entities/company.entity";
import { Address } from "../../address/entities/address.entity";
import { Employee } from "../../employees/entities/employee.entity";

@Entity("buildings")
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 50, nullable: true })
  type?: string;

  // owner / creator user
  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  user?: User | null;

  @ManyToOne(() => Company, (c) => c.buildings, {
    nullable: true,
    onDelete: "SET NULL",
  })
  company?: Company | null;

  @Column({ default: true })
  is_active: boolean;

  // join table is defined on Address side in previous file,
  // but we keep the relation here as inverse side
  @ManyToMany(() => Address, (a) => a.buildings)
  addresses?: Address[];

  @OneToMany(() => Employee, (e) => e.company)
  employees?: Employee[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
