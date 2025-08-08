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
import { CountriesService } from "./countries.service";
import { CreateCountryInput } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { Country } from "./entities/country.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Countries")
@Controller("countries")
// @UseGuards(JwtAuthGuard)
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new country" })
  @ApiBody({ type: CreateCountryInput })
  @ApiResponse({ status: 201, description: "Country created", type: Country })
  create(@Body() input: CreateCountryInput): Promise<Country> {
    return this.countriesService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get list of all countries" })
  findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get country by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Country details", type: Country })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Country> {
    return this.countriesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update country by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateCountryDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateCountryDto
  ): Promise<Country> {
    return this.countriesService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete country by ID" })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.countriesService.remove(id);
  }
}
