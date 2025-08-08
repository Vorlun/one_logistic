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
import { DistrictsService } from "./districts.service";
import { CreateDistrictInput } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./entities/district.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Districts")
@Controller("districts")
// @UseGuards(JwtAuthGuard)
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new district" })
  @ApiBody({ type: CreateDistrictInput })
  @ApiResponse({ status: 201, description: "District created", type: District })
  create(@Body() input: CreateDistrictInput): Promise<District> {
    return this.districtsService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get list of all districts" })
  findAll(): Promise<District[]> {
    return this.districtsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get district by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "District details", type: District })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<District> {
    return this.districtsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update district by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateDistrictDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateDistrictDto
  ): Promise<District> {
    return this.districtsService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete district by ID" })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.districtsService.remove(id);
  }
}
