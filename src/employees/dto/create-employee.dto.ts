import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
  IsOptional,
  IsInt,
  IsBoolean,
} from "class-validator";

export class CreateEmployeeInput {
  @ApiProperty({ example: 1, description: "Company ID" })
  @IsInt()
  company_id: number;

  @ApiProperty({ example: 10, description: "User ID" })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: "Manager", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  position?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
