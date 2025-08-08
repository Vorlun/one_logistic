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
import { PaymentsService } from "./payments.service";
import { CreatePaymentInput } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./entities/payment.entity";
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

@ApiTags("Payments")
@Controller("payments")
// @UseGuards(JwtAuthGuard, LevelGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @RoleLevel(2)
  @ApiOperation({
    summary: "Create a payment",
    description: "Access: Admin (Level 2) and higher",
  })
  @ApiBody({ type: CreatePaymentInput })
  @ApiResponse({
    status: 201,
    description: "Payment successfully created",
    type: Payment,
  })
  create(@Body() input: CreatePaymentInput): Promise<Payment> {
    return this.paymentsService.create(input);
  }

  @Get()
  @RoleLevel(2)
  @ApiOperation({ summary: "Get list of all payments" })
  @ApiResponse({ status: 200, description: "List of payments" })
  findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @RoleLevel(2)
  @ApiOperation({ summary: "Get payment by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Payment details", type: Payment })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @Patch(":id")
  @RoleLevel(2)
  @ApiOperation({ summary: "Update payment by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({
    status: 200,
    description: "Payment successfully updated",
    type: Payment,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() input: UpdatePaymentDto
  ): Promise<Payment> {
    return this.paymentsService.update(id, input);
  }

  @Delete(":id")
  @RoleLevel(2)
  @ApiOperation({ summary: "Delete payment by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Payment successfully deleted" })
  remove(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return this.paymentsService.remove(id);
  }
}
