import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roleLevel";
export const RoleLevel = (level: number) => SetMetadata(ROLES_KEY, level);
