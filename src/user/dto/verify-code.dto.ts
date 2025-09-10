import { IsNotEmpty, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { mode } from 'src/base/base.dto';

export class VerifyCodeDto {
  @ApiProperty({ enum: mode })
  @IsNotEmpty()
  @IsEnum(mode)
  mode: mode;
  @ApiProperty()
  @IsNotEmpty()
  identifier: string;
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  code: string;
}
