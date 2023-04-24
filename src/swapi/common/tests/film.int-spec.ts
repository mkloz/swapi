import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { FilmController } from '../../film/film.controller';
import { CreateFilmDto } from '../../film/dto/create-film.dto';
import { Film } from '../../film/film.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { INestApplication } from '@nestjs/common';

const filmDto: CreateFilmDto[] = [
  {
    title: 'A New Hope1',
    episode_id: 4,
    opening_crawl:
      "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
  },
  {
    title: 'The Empire Strikes Bac2k',
    episode_id: 5,
    opening_crawl:
      'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
    director: 'Irvin Kershner',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1980-05-17',
  },
];
describe('Film integration test', () => {
  let resourceController: FilmController;
  let module: INestApplication;
  let filmId1: number;
  let filmId2: number;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()
      .then((m) => m.createNestApplication());
    await module.init();
    resourceController = module.get(FilmController);
  });

  afterAll(() => {
    module.close();
  });

  it('controller shoud be defined', () => {
    expect(resourceController).toBeDefined();
  });

  describe('create film', () => {
    it('correct values', async () => {
      const ent = await resourceController.create(filmDto[0]);
      filmId1 = ent.id;
      expect(ent).toBeInstanceOf(Film);
      const ent2 = await resourceController.create(filmDto[1]);
      filmId2 = ent2.id;
      expect(ent2).toBeInstanceOf(Film);
    });

    it.failing('dublicate value', async () => {
      await resourceController.create(filmDto[1]);
    });
  });

  describe('get film', () => {
    it('correct values', async () => {
      expect(
        await resourceController.getOneById({ id: filmId1 }),
      ).toBeInstanceOf(Film);
    });
    it.failing('incorrect value', async () => {
      await resourceController.getOneById({ id: -1 });
    });
  });

  describe('get many film', () => {
    it('correct values', async () => {
      expect(
        await resourceController.getMany({ page: 1, limit: 2 }),
      ).toBeInstanceOf(Pagination);
    }, 15000);
  });

  describe('update film', () => {
    it('correct values', async () => {
      expect(
        await resourceController.updeteOne(
          { id: filmId1 },
          { ...filmDto[0], title: 'New title' },
        ),
      ).toBeInstanceOf(Film);
    });
    it.failing('incorrect value', async () => {
      await resourceController.updeteOne({ id: -1 }, filmDto[0]);
    });
  });

  describe('patch update film', () => {
    it('correct values', async () => {
      expect(
        await resourceController.patchUpdeteOne(
          { id: filmId2 },
          { producer: 'Me' },
        ),
      ).toBeInstanceOf(Film);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, filmDto[0]);
    });
  });

  describe('delete film', () => {
    it('correct values', async () => {
      expect(await resourceController.deleteOne({ id: filmId1 })).toStrictEqual(
        {
          id: filmId1,
        },
      );
      expect(await resourceController.deleteOne({ id: filmId2 })).toStrictEqual(
        {
          id: filmId2,
        },
      );
    });
    it.failing('incorrect value', async () => {
      await resourceController.deleteOne({ id: -1 });
    });
  });
});
