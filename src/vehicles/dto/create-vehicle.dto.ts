import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength, IsNumber } from "class-validator";

export class CreateVehicleInput {
  @ApiProperty({ example: 1, description: "Driver ID" })
  @IsInt()
  driver_id: number;

  @ApiProperty({ example: 1, description: "Company ID" })
  @IsInt()
  company_id: number;

  @ApiProperty({ example: "01A777AA", description: "Plate number" })
  @IsString()
  @MaxLength(20)
  plate_number: string;

  @ApiProperty({ example: "Mercedes Sprinter", description: "Vehicle model" })
  @IsString()
  @MaxLength(100)
  model: string;

  @ApiProperty({ example: "fragile", description: "Product type suitable" })
  @IsString()
  @MaxLength(50)
  type: string;

  @ApiProperty({ example: 2000, description: "Capacity in kg" })
  @IsNumber()
  capacity_kg: number;

  @ApiProperty({ example: 15, description: "Volume in m3" })
  @IsNumber()
  volume_m3: number;

  @ApiProperty({ example: "available", description: "Vehicle status" })
  @IsString()
  @MaxLength(20)
  status: string;
}
