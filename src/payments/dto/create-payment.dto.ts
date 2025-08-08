import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength, IsNumber } from "class-validator";

export class CreatePaymentInput {
  @ApiProperty({ example: 1, description: "Order ID" })
  @IsInt()
  order_id: number;

  @ApiProperty({ example: 1500.75, description: "Payment amount" })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: "card", description: "Payment method" })
  @IsString()
  @MaxLength(50)
  method: string;

  @ApiProperty({ example: "paid", description: "Payment status" })
  @IsString()
  @MaxLength(20)
  status: string;
}
