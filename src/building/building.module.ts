import { Module } from "@nestjs/common";
import { Building } from "./entities/building.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuildingsController } from "./building.controller";
import { BuildingsService } from "./building.service";
import { User } from "../users/entities/user.entity";
import { Company } from "../companies/entities/company.entity";
import { Address } from "../address/entities/address.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Building, User, Company, Address])],
  controllers: [BuildingsController],
  providers: [BuildingsService],
  exports: [BuildingsService],
})
export class BuildingModule {}
