import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({ length: 20, unique: true })
  @Index()
  phone_number: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "text", nullable: true })
  refresh_token?: string;

  @Column({ nullable: true })
  reset_token?: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ type: "uuid", nullable: true })
  activation_link: string | null;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: "role_id" })
  role: Role;

  @OneToMany(() => Vehicle, (b) => b.driver)
  vehicles: Vehicle[];

  @Column({ name: "role_id" })
  role_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
