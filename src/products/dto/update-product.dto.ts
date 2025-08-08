import { PartialType } from '@nestjs/swagger';
import { CreateProductInput } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductInput) {}
