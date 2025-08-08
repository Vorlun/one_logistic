import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleInput } from "./inputs/create-role.input";
import { UpdateRoleInput } from "./inputs/update-role.input";
import { Role } from "./entities/role.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RoleLevel } from "../common/decorators/roles-level.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { LevelGuard } from "../common/guards/roles.guard";

@ApiTags("Roles")
@Controller("roles")
@UseGuards(JwtAuthGuard, LevelGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RoleLevel(3)
  @ApiOperation({ summary: "Create a new role", description: "Access: Super Admin (Level 3)" })
  @ApiBody({ type: CreateRoleInput })
  @ApiResponse({ status: 201, description: "Role successfully created", type: Role })
  create(@Body() input: CreateRoleInput): Promise<Role> {
    return this.rolesService.create(input);
  }

  @Get()
  @RoleLevel(2)
  @ApiOperation({ summary: "Get list of all roles", description: "Access: Admin (Level 2) and higher" })
  @ApiResponse({ status: 200, description: "List of roles" })
  findAll(@CurrentUser() user: User): Promise<any> {
    return this.rolesService.findAllWithRestrictions(user);
  }

  @Get(":id")
  @RoleLevel(2)
  @ApiOperation({ summary: "Get role details by ID", description: "Access: Admin (Level 2) and higher" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Role details", type: Role })
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.rolesService.findOneWithRestrictions(id, user);
  }

  @Patch(":id")
  @RoleLevel(3)
  @ApiOperation({ summary: "Update role by ID", description: "Access: Super Admin (Level 3)" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateRoleInput })
  @ApiResponse({ status: 200, description: "Role successfully updated", type: Role })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: Omit<UpdateRoleInput, "id">
  ): Promise<Role> {
    return this.rolesService.update({ ...input, id });
  }

  @Delete(":id")
  @RoleLevel(3)
  @ApiOperation({ summary: "Delete role by ID", description: "Access: Super Admin (Level 3)" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Role successfully deleted" })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.rolesService.remove(id);
  }

  @Get("filter/name/:name")
  @RoleLevel(2)
  @ApiOperation({ summary: "Filter roles by name", description: "Access: Admin (Level 2) and higher" })
  @ApiParam({ name: "name", type: String })
  @ApiResponse({ status: 200, description: "Filtered roles list" })
  filterByName(
    @Param("name") name: string,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.rolesService.filterByName(name, user);
  }
}
