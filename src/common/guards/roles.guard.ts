import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles-level.decorator";

@Injectable()
export class LevelGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const minLevel = this.reflector.get<number>(
      ROLES_KEY,
      context.getHandler()
    );
    if (minLevel === undefined) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user?.role?.level || user.role.level < minLevel) {
      throw new ForbiddenException("Access denied: insufficient role level");
    }
    return true;
  }
}
