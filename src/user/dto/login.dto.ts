import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { verificationConstant } from 'config/constants';

enum device {
  'android',
  'ios',
  'web',
}

class LoginMobileDto {
  @ApiProperty()
  @IsNotEmpty()
  mobile_no: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  device_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(device)
  device: device;

  current_location: {
    type: string;
    current_location: number[];
  };

  access_token: string;
}

export class LoginEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  device_token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(device)
  device: device;

  current_location: {
    type: string;
    current_location: number[];
  };

  access_token: string;
}

const loginDto =
  verificationConstant.mode == 'email' ? LoginEmailDto : LoginMobileDto;

export class LoginDto extends loginDto {}
