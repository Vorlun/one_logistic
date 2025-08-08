import { PartialType } from '@nestjs/swagger';
import { CreateRegionInput } from './create-region.dto';

export class UpdateRegionDto extends PartialType(CreateRegionInput) {}
