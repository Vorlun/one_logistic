import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateRoleInput {
  @IsInt()
  @ApiProperty({ example: 1, description: 'Role ID to update' })
  id: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'manager',
    description: 'Updated name',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Manages resources', required: false })
  description?: string;
}
