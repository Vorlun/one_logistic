import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsInt,
  Min,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Ali Valiyev", description: "Full name of the user" })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: "ali@example.com", description: "Email address" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "securePassword123", description: "User password" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "securePassword123",
    description: "Password confirmation",
  })
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Uzbekistan phone number",
  })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({
    example: true,
    description: "Whether the user is active",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ example: 1, description: "Role ID assigned to the user" })
  @IsInt()
  role_id: number;
}
