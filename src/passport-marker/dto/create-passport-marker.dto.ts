import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreatePassportMarkerDto extends BaseCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  passport: string;
  user: string;
}
