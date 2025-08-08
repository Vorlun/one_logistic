import { PartialType } from '@nestjs/swagger';
import { CreateBuildingInput } from './create-building.dto';

export class UpdateBuildingDto extends PartialType(CreateBuildingInput) {}
