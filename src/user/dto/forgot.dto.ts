import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { mode } from 'src/base/base.dto';

export class ForgotDto {
  @ApiProperty()
  @IsNotEmpty()
  identifier: string;
  @ApiProperty({ enum: mode })
  @IsNotEmpty()
  @IsEnum(mode)
  mode: mode;
}
