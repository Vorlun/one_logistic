import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Company } from "../../companies/entities/company.entity";

@Entity("employees")
@Index(["company", "user"], { unique: true })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (c) => c.employees, {
    nullable: false,
    onDelete: "CASCADE",
  })
  company: Company;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  user: User;

  @Column({ length: 100, nullable: true })
  position?: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
