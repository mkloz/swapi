import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { IAWS } from 'src/configs/config';

export class AwsConfig {
  getConfigAsync() {
    return {
      defaultServiceOptions: {
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const aws = configService.get<IAWS>('aws');
          return {
            region: aws.s3.region,
            credentials: {
              accessKeyId: aws.s3.keyId,
              secretAccessKey: aws.s3.secretKey,
            },
          };
        },
      },
      services: [S3],
    };
  }
}
