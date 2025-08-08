import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Building } from "../../building/entities/building.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";

@Entity("companies")
@Index(["inn"], { unique: true })
@Index(["email"], { unique: true })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 20, unique: true })
  inn: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 30, nullable: true })
  phone?: string;

  // manager (user) - optional, if manager user deleted -> SET NULL
  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  manager?: User | null;

  @OneToMany(() => Building, (b) => b.company)
  buildings: Building[];

  @OneToMany(() => Vehicle, (v) => v.company)
  vehicles: Vehicle[];

  @OneToMany(() => Employee, (e) => e.company)
  employees: Employee[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
