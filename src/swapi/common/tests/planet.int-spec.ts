import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Pagination } from 'nestjs-typeorm-paginate';
import { INestApplication } from '@nestjs/common';
import { CreatePlanetDto } from 'src/swapi/planet/dto/create-planet.dto';
import { PlanetController } from 'src/swapi/planet/planet.controller';
import { Planet } from 'src/swapi/planet/planet.entity';

const planetsDto: CreatePlanetDto[] = [
  {
    name: 'Tatooine1232',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
  },
  {
    name: 'Alder2an',
    rotation_period: '24',
    orbital_period: '364',
    diameter: '12500',
    climate: 'temperate',
    gravity: '1 standard',
    terrain: 'grasslands, mountains',
    surface_water: '40',
    population: '2000000000',
  },
];
describe('Planet integration test', () => {
  let resourceController: PlanetController;
  let module: INestApplication;
  let id1: number;
  let id2: number;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile()
      .then((m) => m.createNestApplication());
    await module.init();

    resourceController = module.get(PlanetController);
  });

  afterAll(() => {
    module.close();
  });

  it('controller shoud be defined', () => {
    expect(resourceController).toBeDefined();
  });

  describe('create planet', () => {
    it('correct values', async () => {
      const ent = await resourceController.addOne(planetsDto[0]);
      id1 = ent.id;
      expect(ent).toBeInstanceOf(Planet);
      const ent2 = await resourceController.addOne(planetsDto[1]);
      id2 = ent2.id;
      expect(ent2).toBeInstanceOf(Planet);
    });

    it.failing('dublicate value', async () => {
      await resourceController.addOne(planetsDto[1]);
    });
  });

  describe('get planet', () => {
    it('correct values', async () => {
      expect(await resourceController.getOneById({ id: id1 })).toBeInstanceOf(
        Planet,
      );
    });
    it.failing('incorrect value', async () => {
      await resourceController.getOneById({ id: -1 });
    });
  });

  describe('get many planet', () => {
    it('correct values', async () => {
      expect(
        await resourceController.getMany({ page: 1, limit: 10 }),
      ).toBeInstanceOf(Pagination);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, planetsDto[0]);
    });
  });

  describe('update planet', () => {
    it('correct values', async () => {
      expect(
        await resourceController.updeteOne(
          { id: id1 },
          { ...planetsDto[0], name: 'New name' },
        ),
      ).toBeInstanceOf(Planet);
    });
    it.failing('incorrect value', async () => {
      await resourceController.updeteOne({ id: -1 }, planetsDto[0]);
    });
  });

  describe('patch update planet', () => {
    it('correct values', async () => {
      expect(
        await resourceController.patchUpdeteOne({ id: id2 }, { name: 'New' }),
      ).toBeInstanceOf(Planet);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, planetsDto[0]);
    });
  });

  describe('delete planet', () => {
    it('correct values', async () => {
      expect(await resourceController.deleteOne({ id: id1 })).toStrictEqual({
        id: id1,
      });
      expect(await resourceController.deleteOne({ id: id2 })).toStrictEqual({
        id: id2,
      });
    });
    it.failing('incorrect value', async () => {
      await resourceController.deleteOne({ id: -1 });
    });
  });
});
