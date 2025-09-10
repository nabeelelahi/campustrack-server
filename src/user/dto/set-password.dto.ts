import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPaswordDto {
  @ApiProperty()
  @IsNotEmpty()
  reset_password_token: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
