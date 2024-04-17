import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async create(file: Express.MulterS3.File) {
    return await this.prisma.image.create({
      data: {
        fileName: file.key,
        contentLength: file.size,
        contentType: file.mimetype,
        url: file.location,
      },
    });
  }

  async createMany(files: Express.MulterS3.File[]) {
    const parsedFiles = files.map((file) => {
      return {
        fileName: file.key,
        contentLength: file.size,
        contentType: file.mimetype,
        url: file.location,
      };
    });

    return await this.prisma.image.createMany({
      data: parsedFiles,
    });
  }

  async findAll() {
    return this.prisma.image.findMany();
  }
}
