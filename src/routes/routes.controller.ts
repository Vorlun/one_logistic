import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { RoutesService } from "./routes.service";
import { CreateRouteInput } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";
import { Route } from "./entities/route.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Routes")
@Controller("routes")
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new route" })
  @ApiBody({ type: CreateRouteInput })
  @ApiResponse({
    status: 201,
    description: "Route successfully created",
    type: Route,
  })
  create(@Body() input: CreateRouteInput): Promise<Route> {
    return this.routesService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get all routes" })
  @ApiResponse({ status: 200, description: "List of routes", type: [Route] })
  findAll(): Promise<Route[]> {
    return this.routesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get route details by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Route details", type: Route })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Route> {
    return this.routesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update route by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateRouteDto })
  @ApiResponse({
    status: 200,
    description: "Route successfully updated",
    type: Route,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateRouteDto
  ): Promise<Route> {
    return this.routesService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete route by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Route successfully deleted" })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.routesService.remove(id);
  }

  @Post(":id/assign-orders")
  @ApiOperation({
    summary: "Assign all pending orders on this route to vehicles",
  })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Orders assigned successfully" })
  assignOrders(@Param("id", ParseIntPipe) id: number): Promise<string> {
    return this.routesService.assignOrdersToVehicles(id);
  }
}
