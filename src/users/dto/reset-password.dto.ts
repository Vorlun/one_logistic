import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SetNewPasswordDto {
  @ApiProperty({ example: "newStrongPassword123", description: "New password" })
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({
    example: "newStrongPassword123",
    description: "Confirm new password",
  })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
