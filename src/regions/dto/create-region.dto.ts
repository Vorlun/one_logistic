import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsInt } from "class-validator";

export class CreateRegionInput {
  @ApiProperty({ example: "Tashkent", description: "Region name" })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 1, description: "Country ID" })
  @IsInt()
  country_id: number;
}
