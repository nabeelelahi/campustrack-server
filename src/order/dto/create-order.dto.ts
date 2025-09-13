import { IsNotEmpty, IsMongoId, IsArray } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreateOrderDto extends BaseCreateDto {
    staff_member?: string;
    
    @IsNotEmpty()
    @IsMongoId()
    student?: string;
  
    @IsNotEmpty()
    @IsArray()
    @IsMongoId({ each: true })
    items?: string[]; 
}
