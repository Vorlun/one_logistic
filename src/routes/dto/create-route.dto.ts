import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, MaxLength, IsNumber } from "class-validator";

export class CreateRouteInput {
  @ApiProperty({ example: 1, description: "Origin address ID" })
  @IsInt()
  origin_id: number;

  @ApiProperty({ example: 2, description: "Destination address ID" })
  @IsInt()
  destination_id: number;

  @ApiProperty({ example: 120, description: "Estimated time in minutes" })
  @IsInt()
  estimated_time: number;

  @ApiProperty({ example: "road", description: "Route type" })
  @IsString()
  @MaxLength(50)
  route_type: string;

  @ApiProperty({ example: 550.5, description: "Distance in km" })
  @IsNumber()
  distance_km: number;
}
