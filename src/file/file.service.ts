import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from 'src/common/dto/id.dto';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { FileS3Service } from './file-s3.service';
import { ID } from 'src/common/common.interface';
@Injectable()
export class FileService {
  public constructor(
    @InjectRepository(File) private readonly fileRepo: Repository<File>,
    private readonly s3Service: FileS3Service,
  ) {}

  public add(files: Express.Multer.File[]): Promise<File[]> {
    return Promise.all(
      files.map(async (file) => {
        const uploadResult = await this.s3Service.addFile(file);
        const ent = this.fileRepo.create({
          name: uploadResult.Key,
          url: uploadResult.Location,
        });

        return await this.fileRepo.save(ent);
      }),
    );
  }

  public getFile(id: IdDto): Promise<File> {
    const value = this.fileRepo.findOneBy(id);

    if (!value) {
      throw new NotFoundException('File not found');
    }

    return value;
  }

  public async remove(id: IdDto): Promise<ID> {
    const ent = await this.fileRepo.findOneBy(id);
    if (!ent) {
      throw new NotFoundException();
    }
    await this.s3Service.removeFile(ent.name);
    await this.fileRepo.remove(ent);

    return id;
  }
}
