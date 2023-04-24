import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Pagination } from 'nestjs-typeorm-paginate';
import { INestApplication } from '@nestjs/common';
import { CreateStarshipDto } from 'src/swapi/starship/dto/create-starship.dto';
import { StarshipController } from 'src/swapi/starship/starship.controller';
import { Starship } from 'src/swapi/starship/starship.entity';

const starshipsDto: CreateStarshipDto[] = [
  {
    name: 'CR90 corvette12',
    model: 'CR90 corvette',
    manufacturer: 'Corellian Engineering Corporation',
    cost_in_credits: '3500000',
    length: '150',
    max_atmosphering_speed: '950',
    crew: '30-165',
    passengers: '600',
    cargo_capacity: '3000000',
    consumables: '1 year',
    hyperdrive_rating: '2.0',
    MGLT: '60',
    starship_class: 'corvette',
  },
  {
    name: 'Star Destro2yer',
    model: 'Imperial I-class Star Destroyer',
    manufacturer: 'Kuat Drive Yards',
    cost_in_credits: '150000000',
    length: '1,600',
    max_atmosphering_speed: '975',
    crew: '47,060',
    passengers: 'n/a',
    cargo_capacity: '36000000',
    consumables: '2 years',
    hyperdrive_rating: '2.0',
    MGLT: '60',
    starship_class: 'Star Destroyer',
  },
];
describe('Starship integration test', () => {
  let resourceController: StarshipController;
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

    resourceController = module.get(StarshipController);
  });

  afterAll(() => {
    module.close();
  });

  it('controller shoud be defined', () => {
    expect(resourceController).toBeDefined();
  });

  describe('create starship', () => {
    it('correct values', async () => {
      const ent = await resourceController.addOne(starshipsDto[0]);
      id1 = ent.id;
      expect(ent).toBeInstanceOf(Starship);
      const ent2 = await resourceController.addOne(starshipsDto[1]);
      id2 = ent2.id;
      expect(ent2).toBeInstanceOf(Starship);
    });

    it.failing('dublicate value', async () => {
      await resourceController.addOne(starshipsDto[1]);
    });
  });

  describe('get starship', () => {
    it('correct values', async () => {
      expect(await resourceController.getOneById({ id: id1 })).toBeInstanceOf(
        Starship,
      );
    });
    it.failing('incorrect value', async () => {
      await resourceController.getOneById({ id: -1 });
    });
  });

  describe('get many starship', () => {
    it('correct values', async () => {
      expect(
        await resourceController.getMany({ page: 1, limit: 10 }),
      ).toBeInstanceOf(Pagination);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, starshipsDto[0]);
    });
  });

  describe('update starship', () => {
    it('correct values', async () => {
      expect(
        await resourceController.updeteOne(
          { id: id1 },
          { ...starshipsDto[0], name: 'New name' },
        ),
      ).toBeInstanceOf(Starship);
    });
    it.failing('incorrect value', async () => {
      await resourceController.updeteOne({ id: -1 }, starshipsDto[0]);
    });
  });

  describe('patch update starship', () => {
    it('correct values', async () => {
      expect(
        await resourceController.patchUpdeteOne({ id: id1 }, { name: 'New' }),
      ).toBeInstanceOf(Starship);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, starshipsDto[0]);
    });
  });

  describe('delete starship', () => {
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
