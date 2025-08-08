import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
  IsOptional,
  IsInt,
  IsBoolean,
} from "class-validator";

export class CreateBuildingInput {
  @ApiProperty({ example: "Main Office" })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: "office", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  company_id?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
