import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeInput } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeInput) {}
