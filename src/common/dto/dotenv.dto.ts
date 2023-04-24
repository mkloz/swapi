import {
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentVariables {
  @IsEnum(Env)
  NODE_ENV: Env;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  @Length(4, 20)
  SWAPI_ADMIN_NAME: string;

  @IsString()
  @Length(8, 20)
  @Matches(/(?=.*?[A-Z])/, {
    message: 'Missing a upper case leters in pasword',
  })
  @Matches(/(?=.*?[a-z])/, {
    message: 'Missing a lower case leters in pasword',
  })
  @Matches(/(?=.*?[0-9])/, {
    message: 'Missing a numbers in pasword',
  })
  @Matches(/(?=.*?[#?!@$%^&*-])/, {
    message: 'Missing a special charecters in pasword',
  })
  SWAPI_ADMIN_PASSWORD: string;

  @MinLength(8)
  @IsString()
  SWAPI_URL: string;

  @MinLength(8)
  @IsString()
  PROJECT_URL: string;

  @IsString()
  AWS_S3_REGION: string;

  @IsString()
  AWS_S3_ACCESS_KEY_ID: string;

  @IsString()
  AWS_S3_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_PUBLIC_BUCKET_NAME: string;

  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_TIME: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  JWT_REFRESH_TOKEN_TIME: string;
}
