import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
  IsInt,
} from "class-validator";

export class CreateCompanyInput {
  @ApiProperty({ example: "My Company LLC" })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: "305841256" })
  @IsString()
  @MaxLength(20)
  inn: string;

  @ApiProperty({ example: "company@mail.com" })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({ example: "+998901234567", required: false })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsInt()
  manager_id?: number;
}
