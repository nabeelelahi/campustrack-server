import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreateMenuItemDto extends BaseCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
