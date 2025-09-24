import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreateAttendanceDto extends BaseCreateDto {
  // @IsString()
  // @IsMongoId()
  student: string;
  @IsString()
  @IsMongoId()
  class: string;
  @IsString()
  @IsNotEmpty()
  action: string;
}
