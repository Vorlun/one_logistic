import { PartialType } from '@nestjs/swagger';
import { CreateRouteInput } from './create-route.dto';

export class UpdateRouteDto extends PartialType(CreateRouteInput) {}
