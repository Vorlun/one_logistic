import { Module } from "@nestjs/common";
import { Address } from "./entities/address.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressesController } from "./address.controller";
import { AddressesService } from "./address.service";
import { District } from "../districts/entities/district.entity";
import { User } from "../users/entities/user.entity";
import { Building } from "../building/entities/building.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Address, District, User, Building])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressModule {}
