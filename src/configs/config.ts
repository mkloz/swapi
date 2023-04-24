import * as dotenv from 'dotenv';
import { Env } from 'src/common/dto/dotenv.dto';

dotenv.config();
const { env } = process;

export type IConfig = typeof config;
export type IMySql = typeof config.mysql;
export type ISwapi = typeof config.swapi;
export type IAWS = typeof config.aws;
export type IJWT = typeof config.jwt;

const config = {
  env: env.NODE_ENV,
  port: +env.PORT,
  mysql: {
    user: env.NODE_ENV === Env.Test ? env.TEST_DB_USER : env.DB_USER,
    password: env.NODE_ENV === Env.Test ? env.TEST_DB_PASS : env.DB_PASS,
    database: env.NODE_ENV === Env.Test ? env.TEST_DB_NAME : env.DB_NAME,
    host: env.NODE_ENV === Env.Test ? env.TEST_DB_HOST : env.DB_HOST,
    port: env.NODE_ENV === Env.Test ? +env.TEST_DB_PORT : +env.DB_PORT,
  },
  swapi: {
    admin: {
      name: env.SWAPI_ADMIN_NAME,
      pass: env.SWAPI_ADMIN_PASSWORD,
    },
    swapiUrl: env.SWAPI_URL,
    projectUrl: env.PROJECT_URL,
  },
  aws: {
    s3: {
      region: env.AWS_S3_REGION,
      keyId: env.AWS_S3_ACCESS_KEY_ID,
      secretKey: env.AWS_S3_SECRET_ACCESS_KEY,
      bucketName: env.AWS_PUBLIC_BUCKET_NAME,
    },
  },
  jwt: {
    accessToken: {
      secret: env.JWT_ACCESS_TOKEN_SECRET,
      time: env.JWT_ACCESS_TOKEN_TIME,
    },
    refreshToken: {
      secret: env.JWT_REFRESH_TOKEN_SECRET,
      time: env.JWT_REFRESH_TOKEN_TIME,
    },
  },
};
export const getEnvVar = () => config;
