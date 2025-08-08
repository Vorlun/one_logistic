import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Region } from "./entities/region.entity";
import { RegionsController } from "./regions.controller";
import { RegionsService } from "./regions.service";
import { Country } from "../countries/entities/country.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Region, Country])],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
