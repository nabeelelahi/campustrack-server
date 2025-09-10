import { PartialType } from '@nestjs/swagger';
import { CreatePassportMarkerDto } from './create-passport-marker.dto';

export class UpdatePassportMarkerDto extends PartialType(CreatePassportMarkerDto) {}
