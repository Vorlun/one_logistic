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
import { BuildingsService } from "./building.service";
import { CreateBuildingInput } from "./dto/create-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";
import { Building } from "./entities/building.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Buildings")
@Controller("buildings")
@UseGuards(JwtAuthGuard)
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new building" })
  @ApiBody({ type: CreateBuildingInput })
  @ApiResponse({ status: 201, description: "Building created", type: Building })
  create(@Body() input: CreateBuildingInput): Promise<Building> {
    return this.buildingsService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get list of all buildings" })
  findAll(): Promise<Building[]> {
    return this.buildingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get building by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Building details", type: Building })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Building> {
    return this.buildingsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update building by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateBuildingDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateBuildingDto
  ): Promise<Building> {
    return this.buildingsService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete building by ID" })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.buildingsService.remove(id);
  }
}
