import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  MaxLength,
  IsNumberString,
  IsInt,
  IsArray,
} from "class-validator";

export class CreateAddressInput {
  @ApiProperty({ example: 1, description: "District ID", required: false })
  @IsOptional()
  @IsInt()
  district_id?: number;

  @ApiProperty({ example: "Amir Temur street", description: "Street name" })
  @IsString()
  @MaxLength(200)
  street: string;

  @ApiProperty({ example: "12A", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  house_number?: string;

  @ApiProperty({ example: "100100", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  postal_code?: string;

  @ApiProperty({ example: "41.2995", required: false })
  @IsOptional()
  @IsNumberString()
  lat?: string;

  @ApiProperty({ example: "69.2401", required: false })
  @IsOptional()
  @IsNumberString()
  lon?: string;

  @ApiProperty({ example: 5, required: false, description: "User ID" })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiProperty({
    example: [1, 2],
    required: false,
    description: "Building IDs to link",
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  building_ids?: number[];
}
