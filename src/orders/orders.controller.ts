import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderInput } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new order" })
  @ApiBody({ type: CreateOrderInput })
  @ApiResponse({ status: 201, type: Order })
  create(@Body() input: CreateOrderInput): Promise<Order> {
    return this.ordersService.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, type: [Order] })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get order by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, type: Order })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update order by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateOrderDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdateOrderDto
  ): Promise<Order> {
    return this.ordersService.update(id, input);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete order by ID" })
  @ApiParam({ name: "id", type: Number })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.ordersService.remove(id);
  }

  @Post(":id/assign-products")
  @ApiOperation({ summary: "Auto-assign products to vehicles for an order" })
  @ApiParam({ name: "id", type: Number })
  assignProducts(@Param("id", ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.assignProductsToVehicles(id);
  }
}
