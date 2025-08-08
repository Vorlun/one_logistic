import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcryptjs";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService
  ) {}

  async createAndReturnFullUser(
    createUserDto: CreateUserDto,
    currentUser: User
  ): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existing) throw new BadRequestException("Email already exists");

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const role = await this.roleService.findOne(createUserDto.role_id);
    if (!role) throw new NotFoundException("Role not found");

    // ❗CREATE: Level 0 har kimga ochiq, boshqalarga faqat super_admin (3)
    // if (role.level > 0 && currentUser.role.level < 3) {
    //   throw new ForbiddenException(
    //     "You are not allowed to create users with level > 0"
    //   );
    // }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const { confirm_password, role_id, ...rest } = createUserDto;

    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
      role,
    });

    return await this.userRepository.save(user);
  }

  async findAll(
    currentUser: User
  ): Promise<Omit<User, "password" | "refresh_token" | "reset_token">[]> {
    const currentLevel = currentUser.role.level;

    let users: User[] = [];

    if (currentLevel === 3) {
      users = await this.userRepository.find();
    } else if (currentLevel === 2) {
      users = await this.userRepository.find({
        where: [{ role: { level: 1 } }, { role: { level: 0 } }],
      });
    } else if (currentLevel === 1) {
      users = await this.userRepository.find({
        where: { role: { level: 0 } },
      });
    } else {
      throw new ForbiddenException("You are not allowed to get users list");
    }

    return users.map(this.excludeSensitiveFields);
  }

  async findOne(
    id: number,
    currentUser: User
  ): Promise<Omit<User, "password" | "refresh_token" | "reset_token">> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    const targetLevel = user.role.level;
    const currentLevel = currentUser.role.level;

    if (currentLevel === 3) return this.excludeSensitiveFields(user);

    if (user.id === currentUser.id) return this.excludeSensitiveFields(user);

    if (currentLevel === 2 && targetLevel < 2)
      return this.excludeSensitiveFields(user);

    if (currentLevel === 1 && targetLevel === 0)
      return this.excludeSensitiveFields(user);

    throw new ForbiddenException("You are not allowed to access this user");
  }

  async update(
    id: number,
    dto: UpdateUserDto,
    currentUser: User
  ): Promise<Omit<User, "password" | "refresh_token" | "reset_token">> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    const currentLevel = currentUser.role.level;
    const targetLevel = user.role.level;

    // ❌ Agar parolni update qilmoqchi bo‘lsa - bloklaymiz
    if ("password" in dto) {
      delete dto.password;
    }

    // Ruxsat tekshiruvi
    if (currentLevel === 3) {
      // super_admin har kimni o‘zgartirishi mumkin
    } else if (user.id === currentUser.id) {
      // o‘zini tahrirlash mumkin
    } else if (currentLevel === 2 && targetLevel < 2) {
      // admin level < 2 foydalanuvchini update qila oladi
    } else if (currentLevel === 1 && targetLevel === 0) {
      // manager faqat level 0 foydalanuvchini update qila oladi
    } else {
      throw new ForbiddenException("You are not allowed to update this user");
    }

    if (dto.role_id) {
      const role = await this.roleService.findOne(dto.role_id);
      if (!role) throw new NotFoundException("Role not found");
      user.role = role;
    }

    Object.assign(user, dto);
    const updated = await this.userRepository.save(user);
    return this.excludeSensitiveFields(updated);
  }

  async remove(id: number, currentUser: User): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    const currentLevel = currentUser.role.level;
    const targetLevel = user.role.level;

    if (currentLevel === 3) {
      // super_admin hammani o‘chira oladi
    } else if (user.id === currentUser.id) {
      // o‘zini o‘chirishga ruxsat
    } else if (currentLevel > targetLevel) {
      // past darajadagilarni o‘chirish mumkin
    } else {
      throw new ForbiddenException("You are not allowed to delete this user");
    }

    await this.userRepository.remove(user);
  }

  async findByEmailWithSensitive(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("User with this email not found");
    }
    return user;
  }

  private excludeSensitiveFields(
    user: User
  ): Omit<User, "password" | "refresh_token" | "reset_token"> {
    const { password, refresh_token, reset_token, ...rest } = user;
    return rest;
  }

  async findByIdWithSensitive(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async findByResetToken(token: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { reset_token: token },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!user.reset_token) {
      throw new BadRequestException("Invalid or expired token");
    }

    return user;
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
