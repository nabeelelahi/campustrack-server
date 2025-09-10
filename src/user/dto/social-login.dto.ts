import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { device, platform } from 'src/base/base.dto';

export class SocialLoginDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image_url: string;

  @ApiProperty({ enum: platform })
  @IsNotEmpty()
  @IsEnum(platform)
  platform: platform;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  platform_id: string;

  @ApiProperty({ enum: device })
  @IsNotEmpty()
  @IsEnum(device)
  device: device;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  device_token: string;

  access_token: string;
}
