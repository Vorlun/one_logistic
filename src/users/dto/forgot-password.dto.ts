import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
  @ApiProperty({
    example: "ali@example.com",
    description: "Email address to send reset link",
  })
  @IsEmail()
  email: string;
}
