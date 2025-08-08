import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MaxLength, Min, IsInt } from "class-validator";

export class CreateRoleInput {
  @ApiProperty({ example: "admin", description: "Role name" })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: "Full access role",
    description: "Description of the role",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 3,
    description:
      "Access level of the role (3=super admin, 2=admin, 1=manager, 0=client/driver)",
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  level?: number;
}
