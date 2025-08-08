import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCountryInput {
  @ApiProperty({ example: "UZ", description: "ISO 2 or 3-letter country code" })
  @IsString()
  @MaxLength(3)
  iso_code: string;

  @ApiProperty({ example: "Uzbekistan", description: "Full country name" })
  @IsString()
  @MaxLength(100)
  name: string;
}
