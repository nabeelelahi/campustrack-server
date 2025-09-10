import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

enum mode {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export class UploadFileDto extends BaseCreateDto {
  @ApiProperty({ enum: mode })
  @IsNotEmpty()
  @IsEnum(mode)
  mode: mode;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  file: Express.Multer.File[];
}
