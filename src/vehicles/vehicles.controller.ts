import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleInput } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  // -------------------- CRUD --------------------

  @Post()
  create(@Body() createVehicleDto: CreateVehicleInput) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.vehiclesService.remove(id);
  }

  // -------------------- BUSINESS LOGIC --------------------

  @Post("assign/:orderId")
  assignOrderProductsToVehicles(
    @Param("orderId", ParseIntPipe) orderId: number
  ) {
    return this.vehiclesService.assignOrderProductsToVehicles(orderId);
  }
}
