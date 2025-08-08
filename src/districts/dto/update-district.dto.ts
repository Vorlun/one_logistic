import { PartialType } from '@nestjs/swagger';
import { CreateDistrictInput } from './create-district.dto';

export class UpdateDistrictDto extends PartialType(CreateDistrictInput) {}
