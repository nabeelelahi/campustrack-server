import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseCreateDto } from 'src/base/base.dto';

export class CreateNotificationDto extends BaseCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;
    @ApiProperty()
    @IsNotEmpty()
    description: string;
    @ApiProperty()
    @IsNotEmpty()
    image_url: string;
}
