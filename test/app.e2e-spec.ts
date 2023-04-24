import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigService } from '@nestjs/config';
import { ISwapi } from 'src/configs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FILES_FIELD } from 'src/file/file.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let configServise: ConfigService;
  let swapi: ISwapi;
  let accessToken: string;
  let refreshToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture
      .createNestApplication<NestExpressApplication>()
      .setGlobalPrefix('api', { exclude: ['/'] })
      .useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    configServise = app.get(ConfigService);
    swapi = configServise.get<ISwapi>('swapi');
  });

  afterAll(() => {
    app.close();
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });
  it('/api/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: `${swapi.admin.name}`,
        password: `${swapi.admin.pass}`,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        if (
          'accessToken' in res.body &&
          'refreshToken' in res.body &&
          typeof res.body.accessToken === 'string' &&
          typeof res.body.refreshToken === 'string'
        ) {
          accessToken = res.body.accessToken;
          refreshToken = res.body.refreshToken;
          return;
        }

        throw new Error('Incorect responce');
      });
  });
  it('/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
  it('/api/auth/refresh (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/refresh')
      .set('Accept', 'application/json')
      .send({
        refreshToken: refreshToken,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        if (
          'accessToken' in res.body &&
          'refreshToken' in res.body &&
          typeof res.body.accessToken === 'string'
        ) {
          return;
        }
        throw new Error('Incorect responce');
      });
  });
  it('/api/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .send({
        username: `DI3Lcl#sp#5!`,
        password: `DI3Lcl#sp#5!`,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        if (
          'accessToken' in res.body &&
          'refreshToken' in res.body &&
          typeof res.body.accessToken === 'string'
        ) {
          return res.body.accessToken;
        }

        throw new Error('Incorect responce');
      });
  });
  it('/api/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .send({
        username: `DILspwvs`,
        password: `DILclspfb`,
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  let fileId: number;
  it('/api/files (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/files')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Accept', 'multipart/form-data')
      .attach(FILES_FIELD, 'test/testcases/download.png')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) => {
        if (
          'id' in res.body[0] &&
          typeof res.body[0].id == 'number' &&
          'name' in res.body[0] &&
          typeof res.body[0].name == 'string' &&
          'url' in res.body[0] &&
          typeof res.body[0].url == 'string'
        ) {
          return (fileId = res.body[0].id);
        }
        throw new Error('Incorect responce');
      });
  });
  it('/api/files/{id} (GET)', () => {
    return request(app.getHttpServer())
      .get(`/api/files/${fileId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });
  it('/api/files/{id} (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/api/files/${fileId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect('Content-Type', /json/)
      .expect(200, { id: fileId });
  });
});
