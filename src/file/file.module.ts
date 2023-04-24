import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FileS3Service } from './file-s3.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AwsConfig } from './configs/aws.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register(),
    AwsSdkModule.forRootAsync(new AwsConfig().getConfigAsync()),
  ],
  controllers: [FileController],
  providers: [FileService, FileS3Service],
})
export class FileModule {}
