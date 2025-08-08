import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsInt } from "class-validator";

export class CreateDistrictInput {
  @ApiProperty({ example: "Yunusabad", description: "District name" })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 1, description: "Region ID" })
  @IsInt()
  region_id: number;
}
