import { BaseCreateDto } from '../../base/base.dto';
import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsArray,
  IsMongoId,
  ValidateIf,
} from 'class-validator';
import { Gender, Role } from '../../base/base.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UserDto extends BaseCreateDto {
  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(2)
  @MaxLength(250)
  address: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mobile_no: string;

  username: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  image_url?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  classes?: string[];
  
  @ValidateIf(o => o.role === Role.STUDENT) // only runs if role=student
  @IsNotEmpty({ message: 'Parent is required when role is student' })
  @IsMongoId()
  parent?: string;

  verification_code?: number | string;

  reset_password_token?: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
