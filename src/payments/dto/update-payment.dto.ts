import { PartialType } from '@nestjs/swagger';
import { CreatePaymentInput } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentInput) {}
