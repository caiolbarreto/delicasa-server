import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpCode,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import multerConfig from './multer-config';

@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(@UploadedFile() file: Express.MulterS3.File) {
    console.log('testing here', file);
    return this.uploadService.create(file);
  }

  @Post('many')
  @HttpCode(201)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file' }], multerConfig))
  async createMany(
    @UploadedFiles()
    files: Express.MulterS3.File[],
  ) {
    return await this.uploadService.createMany(files['file']);
  }

  @Get()
  @HttpCode(200)
  async getAllImages() {
    return await this.uploadService.findAll();
  }
}
