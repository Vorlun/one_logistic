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
import { AddressesService } from "./address.service";
import { CreateAddressInput } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@ApiTags("Addresses")
@Controller("address")
// @UseGuards(JwtAuthGuard)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new address" })
  @ApiBody({ type: CreateAddressInput })
  @ApiResponse({ status: 201, description: "Address created", type: Address })
  create(@Body() input: CreateAddressInput): Promise<Address> {
    return this.addressesService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get list of all addresses" })
  findAll(): Promise<Address[]> {
    return this.addressesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get address by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Address details", type: Address })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Address> {
    return this.addressesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update address by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateAddressDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateAddressDto
  ): Promise<Address> {
    return this.addressesService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete address by ID" })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.addressesService.remove(id);
  }
}
