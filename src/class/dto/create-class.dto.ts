import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreateClassDto extends BaseCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsMongoId()
  teacher?: string; // reference to users collection

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  students?: string[]; // array of userIds (students)
}
