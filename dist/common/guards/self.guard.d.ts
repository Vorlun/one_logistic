import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class SelfGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
