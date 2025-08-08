import { PartialType } from '@nestjs/swagger';
import { CreateCountryInput } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryInput){}
