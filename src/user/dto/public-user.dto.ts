import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class PublicUserDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  store_name?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  mobile_no: string;
  @ApiProperty()
  @IsNotEmpty()
  image_url: string;
}

export const publicUserDoc = {
  description: 'User details object.',
  type: [PublicUserDto],
  example: [
    {
      _id: '67a1c423da500bc390069bc6',
      name: 'John Doe',
      email: 'john@yopmail.com',
      mobile_no: '+971255336696',
      image_url:
        'https://res.cloudinary.com/dxyb4xgcs/image/upload/v1738654753/ahsan/ulfzsidiu8mr2hvb4bm3.png',
    },
  ],
};
