import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalResponseInterceptor } from './common/global-response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/global-exception.filter';
import { ConfigService } from '@nestjs/config';
import { createSwapiDocument } from './common/docs/create-swapi-doc';
import { Env } from './common/dto/dotenv.dto';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app
    .use(
      morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms',
      ),
    )
    .setGlobalPrefix('api', { exclude: ['/'] })
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    // .useGlobalFilters(new GlobalExceptionFilter(configService))
    .useGlobalInterceptors(new GlobalResponseInterceptor());

  const port = configService.get<number>('port');

  if (configService.get<string>('env') === Env.Development) {
    SwaggerModule.setup('/api/docs', app, createSwapiDocument(app));
  }

  await app.listen(port, () => {
    Logger.log(`Server is running on ${port} port`);
  });
}

bootstrap();
