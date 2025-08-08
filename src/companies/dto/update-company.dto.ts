import { PartialType } from '@nestjs/swagger';
import { CreateCompanyInput } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyInput) {}
