import { Module } from '@nestjs/common';
import { SwapiModule } from './swapi/swapi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { getTypeormConfig } from 'src/configs/data-source.config';
import { getEnvVar } from './configs/config';
import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';
import { validate } from './common/config.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getEnvVar],
      validate,
    }),
    HealthModule,
    TypeOrmModule.forRoot(getTypeormConfig()),
    AuthModule,
    FileModule,
    SwapiModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
