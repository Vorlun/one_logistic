import { PartialType } from '@nestjs/swagger';
import { CreateVehicleInput } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleInput) {}
