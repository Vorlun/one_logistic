import { PartialType } from '@nestjs/swagger';
import { CreateOrderInput } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderInput) {}
