import { PartialType } from '@nestjs/swagger';
import { CreateAddressInput } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressInput) {}
