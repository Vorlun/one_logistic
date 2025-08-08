import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  MaxLength,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";

export class CreateOrderInput {
  @ApiProperty({ example: 1, description: "Client user ID" })
  @IsInt()
  client_id: number;

  @ApiProperty({ example: 2, description: "Dispatcher user ID" })
  @IsInt()
  dispatcher_id: number;

  @ApiProperty({ example: 10, description: "Pickup address ID" })
  @IsInt()
  pickup_address_id: number;

  @ApiProperty({ example: 11, description: "Delivery address ID" })
  @IsInt()
  delivery_address_id: number;

  @ApiProperty({ example: 5, description: "Route ID" })
  @IsInt()
  route_id: number;

  @ApiProperty({
    example: [1, 2],
    description: "Vehicle IDs assigned to order",
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  vehicle_ids: number[];

  @ApiProperty({ example: "pending", description: "Order status" })
  @IsString()
  @MaxLength(20)
  status: string;

  @ApiProperty({ example: 1500.75, description: "Total price" })
  @IsNumber()
  total_price: number;

  @ApiProperty({ example: "USD", description: "Currency code" })
  @IsString()
  @MaxLength(10)
  currency: string;
}
