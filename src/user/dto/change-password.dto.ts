import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePaswordDto {
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string;
  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}
