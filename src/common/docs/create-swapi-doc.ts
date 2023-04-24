import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IdDto } from '../dto/id.dto';
import { PaginatedDto } from 'src/swapi/common/dto/paginated.dto';

export function createSwapiDocument(app: NestExpressApplication) {
  const cfg = new DocumentBuilder()
    .setTitle('Starwars API')
    .setDescription('API for starwars')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, cfg, {
    extraModels: [PaginatedDto, IdDto],
  });
}
