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
import { EmployeesService } from "./employees.service";
import { CreateEmployeeInput } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";
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

@ApiTags("Employees")
@Controller("employees")
@UseGuards(JwtAuthGuard, LevelGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @RoleLevel(2)
  @ApiOperation({
    summary: "Create a new employee",
    description: "Access: Admin (Level 2) and higher",
  })
  @ApiBody({ type: CreateEmployeeInput })
  @ApiResponse({
    status: 201,
    description: "Employee successfully created",
    type: Employee,
  })
  create(@Body() input: CreateEmployeeInput): Promise<Employee> {
    return this.employeesService.create(input);
  }

  @Get()
  @RoleLevel(2)
  @ApiOperation({
    summary: "Get list of all employees",
    description: "Access: Admin (Level 2) and higher",
  })
  @ApiResponse({ status: 200, description: "List of employees" })
  findAll(@CurrentUser() user: User): Promise<any> {
    return this.employeesService.findAllWithRestrictions(user);
  }

  @Get(":id")
  @RoleLevel(2)
  @ApiOperation({
    summary: "Get employee details by ID",
    description: "Access: Admin (Level 2) and higher",
  })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Employee details", type: Employee })
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.employeesService.findOneWithRestrictions(id, user);
  }

  @Patch(":id")
  @RoleLevel(2)
  @ApiOperation({
    summary: "Update employee by ID",
    description: "Access: Admin (Level 2) and higher",
  })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({
    status: 200,
    description: "Employee successfully updated",
    type: Employee,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: Omit<UpdateEmployeeDto, "id">
  ): Promise<Employee> {
    return this.employeesService.update({ ...input, id });
  }

  @Delete(":id")
  @RoleLevel(3)
  @ApiOperation({
    summary: "Delete employee by ID",
    description: "Access: Super Admin (Level 3)",
  })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Employee successfully deleted" })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.employeesService.remove(id);
  }

  @Get("filter/company/:companyId")
  @RoleLevel(2)
  @ApiOperation({
    summary: "Filter employees by company ID",
    description: "Access: Admin (Level 2) and higher",
  })
  @ApiParam({ name: "companyId", type: Number })
  @ApiResponse({ status: 200, description: "Filtered employees list" })
  filterByCompany(
    @Param("companyId", ParseIntPipe) companyId: number,
    @CurrentUser() user: User
  ): Promise<any> {
    return this.employeesService.filterByCompany(companyId, user);
  }
}
