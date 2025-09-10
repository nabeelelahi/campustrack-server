import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreateDocGuideDto extends BaseCreateDto {
@ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  sub_title: string;
  @ApiProperty()
  @IsNotEmpty()
  file_url: string;
}
