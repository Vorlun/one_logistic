import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { Role } from "../roles/entities/role.entity";
import { RolesService } from "../roles/roles.service";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), MailModule],
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  exports: [TypeOrmModule,UsersService],
})
export class UsersModule {}
