// self-or-lower.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class SelfOrLowerGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const currentUser = req.user;
    const targetId = +req.params.id;

    if (currentUser.id === targetId) return true;

    const targetUser = await this.userRepo.findOne({
      where: { id: targetId },
      relations: ["role"],
    });

    if (!targetUser) {
      throw new ForbiddenException("Target user not found");
    }

    if (currentUser.role.level > targetUser.role.level) {
      return true;
    }

    throw new ForbiddenException("You cannot manage this user");
  }
}
