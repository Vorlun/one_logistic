import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength, IsNumber } from "class-validator";

export class CreateProductInput {
  @ApiProperty({ example: 1, description: "Order ID" })
  @IsInt()
  order_id: number;

  @ApiProperty({ example: "Glass Bottles", description: "Product name" })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 200, description: "Weight per item in kg" })
  @IsNumber()
  weight_kg: number;

  @ApiProperty({ example: 0.5, description: "Volume per item in m3" })
  @IsNumber()
  volume_m3: number;

  @ApiProperty({ example: 100, description: "Quantity of items" })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: "fragile", description: "Product type" })
  @IsString()
  @MaxLength(50)
  type: string;

  @ApiProperty({ example: 10.5, description: "Price per item" })
  @IsNumber()
  price_per: number;
}
