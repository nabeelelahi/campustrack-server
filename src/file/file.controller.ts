import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageConstants } from 'config/constants';
import { UploadFileDto } from './dto/upload-file.dto';
import { Request } from 'express';

@Controller('api/file')
export class FileController {
  constructor(protected _service: FileService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('file', 5, { storage: storageConstants.multer.storage }),
  )
  async upload(@Body() _body: UploadFileDto, @Req() _request: Request) {
    return await this._service.uploadFile(_body, _request);
  }
}
