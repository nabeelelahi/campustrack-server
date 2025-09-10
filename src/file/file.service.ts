import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import * as streamifier from 'streamifier';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FileService {
  private storageMode: string;

  constructor() {
    this.storageMode = process.env.STORAGE_MODE;

    if (this.storageMode === 'cloudinary') {
      cloudinary.config({
        cloud_name: process.env.STORAGE_CLOUD_NAME,
        api_key: process.env.STORAGE_PUBLIC_KEY,
        api_secret: process.env.STORAGE_SECRET_KEY,
      });
    }
  }

  async uploadFile(_body: UploadFileDto, _request: Request) {
    return _body.mode === 'single'
      ? { url: await this.upload(_request.files[0]) }
      : {
          url: await this.uploadMultiple(
            _request.files as Express.Multer.File[],
          ),
        };
  }

  /**
   * Upload a single file based on the current storage mode.
   * @param file Express.Multer.File
   * @returns Promise<string> URL or file path
   */
  async upload(file: Express.Multer.File): Promise<string> {
    if (this.storageMode === 'local') {
      return this.localSingle(file);
    } else if (this.storageMode === 'cloudinary') {
      return (await this.cloudinarySingle(file)).secure_url;
    }
    throw new Error('Unsupported storage mode');
  }

  /**
   * Upload multiple files based on the current storage mode.
   * @param files Express.Multer.File[]
   * @returns Promise<string[]> Array of URLs or file paths
   */
  async uploadMultiple(files: Express.Multer.File[]): Promise<string[]> {
    if (this.storageMode === 'local') {
      return this.localMultiple(files);
    } else if (this.storageMode === 'cloudinary') {
      return await this.cloudinaryMultiple(files);
    }
    throw new Error('Unsupported storage mode');
  }

  /**
   * Handle single file upload locally.
   * @param file Express.Multer.File
   * @returns string File path
   */
  private localSingle(file: Express.Multer.File): string {
    return `uploads/${file.filename}`;
  }

  /**
   * Handle multiple file uploads locally.
   * @param files Express.Multer.File[]
   * @returns string[] Array of file paths
   */
  private localMultiple(files: Express.Multer.File[]): string[] {
    return files.map((file) => `uploads/${file.filename}`);
  }

  /**
   * Handle single file upload to Cloudinary.
   * @param file Express.Multer.File
   * @returns Promise<any> Cloudinary upload result
   */
  private async cloudinarySingle(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const cldUploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ahsan',
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      streamifier.createReadStream(file.buffer).pipe(cldUploadStream);
    });
  }

  /**
   * Handle multiple file uploads to Cloudinary.
   * @param files Express.Multer.File[]
   * @returns Promise<string[]> Array of Cloudinary URLs
   */
  private async cloudinaryMultiple(
    files: Express.Multer.File[],
  ): Promise<string[]> {
    return await Promise.all(
      files.map(async (file) => (await this.cloudinarySingle(file)).secure_url),
    );
  }
}
