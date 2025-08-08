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
import { RegionsService } from "./regions.service";
import { CreateRegionInput } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./entities/region.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RoleLevel } from "../common/decorators/roles-level.decorator";
import { LevelGuard } from "../common/guards/roles.guard";

@ApiTags("Regions")
@Controller("regions")
// @UseGuards(JwtAuthGuard, LevelGuard)
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @RoleLevel(2)
  @ApiOperation({ summary: "Create a new region" })
  @ApiBody({ type: CreateRegionInput })
  @ApiResponse({
    status: 201,
    description: "Region successfully created",
    type: Region,
  })
  create(@Body() input: CreateRegionInput): Promise<Region> {
    return this.regionsService.create(input);
  }

  @Get()
  @RoleLevel(1)
  @ApiOperation({ summary: "Get list of all regions" })
  @ApiResponse({ status: 200, description: "List of regions", type: [Region] })
  findAll(): Promise<Region[]> {
    return this.regionsService.findAll();
  }

  @Get(":id")
  @RoleLevel(1)
  @ApiOperation({ summary: "Get region details by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Region details", type: Region })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Region> {
    return this.regionsService.findOne(id);
  }

  @Patch(":id")
  @RoleLevel(2)
  @ApiOperation({ summary: "Update region by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateRegionDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateRegionDto
  ): Promise<Region> {
    return this.regionsService.update(id, input);
  }

  @Delete(":id")
  @RoleLevel(3)
  @ApiOperation({ summary: "Delete region by ID" })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.regionsService.remove(id);
  }
}
