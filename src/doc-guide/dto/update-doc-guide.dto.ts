import { PartialType } from '@nestjs/swagger';
import { CreateDocGuideDto } from './create-doc-guide.dto';

export class UpdateDocGuideDto extends PartialType(CreateDocGuideDto) {}
