import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { IAWS } from 'src/configs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileS3Service {
  public constructor(
    private readonly configService: ConfigService,
    @InjectAwsService(S3) private readonly s3: S3,
  ) {}

  public async addFile(file: Express.Multer.File) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get<IAWS>('aws').s3.bucketName,
        Body: file.buffer,
        Key: `${uuid()}-${file.originalname}`,
        ContentDisposition: 'inline',
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();
    return uploadResult;
  }

  public async removeFile(name: string) {
    await this.s3
      .deleteObject({
        Bucket: this.configService.get<IAWS>('aws').s3.bucketName,
        Key: name,
      })
      .promise();
  }
}
