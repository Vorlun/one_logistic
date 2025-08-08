import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.user;

    const targetId = parseInt(
      request.params.id ||
        request.body.userId ||
        request.body.id ||
        currentUser?.id,
      10
    );

    if (!currentUser || isNaN(targetId)) {
      throw new ForbiddenException("Invalid request");
    }

    if (currentUser.id !== targetId) {
      throw new ForbiddenException("You can only access your own data");
    }

    return true;
  }
}
