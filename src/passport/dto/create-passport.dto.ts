import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreatePassportDto extends BaseCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
