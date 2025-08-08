import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";
export declare class SelfOrLowerGuard implements CanActivate {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
