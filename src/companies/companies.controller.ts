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
import { CompaniesService } from "./companies.service";
import { CreateCompanyInput } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Companies")
@Controller("companies")
// @UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new company" })
  @ApiBody({ type: CreateCompanyInput })
  @ApiResponse({ status: 201, description: "Company created", type: Company })
  create(@Body() input: CreateCompanyInput): Promise<Company> {
    return this.companiesService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get list of all companies" })
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get company by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Company details", type: Company })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update company by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateCompanyDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateCompanyDto
  ): Promise<Company> {
    return this.companiesService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete company by ID" })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.companiesService.remove(id);
  }
}
