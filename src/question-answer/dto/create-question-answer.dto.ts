import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseCreateDto, Role } from 'src/base/base.dto';

export class CreateQuestionAnswerDto extends BaseCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiPropertyOptional()
  @IsOptional()
  description: string;
  @ApiPropertyOptional()
  @IsOptional()
  parent: string;
  @ApiProperty()
  @IsNotEmpty()
  community: string;
  user: {
    _id: string;
    role: Role;
    name: string;
    email: string;
    mobile_no: string;
    address: string;
    username: string;
  };
}
