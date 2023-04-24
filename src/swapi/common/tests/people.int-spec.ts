import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Pagination } from 'nestjs-typeorm-paginate';
import { INestApplication } from '@nestjs/common';
import { CreatePeopleDto } from 'src/swapi/people/dto/create-people.dto';
import { PeopleController } from 'src/swapi/people/people.controller';
import { People } from 'src/swapi/people/people.entity';

const peopleDto: CreatePeopleDto[] = [
  {
    name: 'C-3PO12',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
  },
  {
    name: 'Luke Skywalk2er',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
  },
];
describe('People integration test', () => {
  let resourceController: PeopleController;
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

    resourceController = module.get(PeopleController);
  });

  afterAll(() => {
    module.close();
  });

  it('controller shoud be defined', () => {
    expect(resourceController).toBeDefined();
  });

  describe('create people', () => {
    it('correct values', async () => {
      const ent = await resourceController.addOne(peopleDto[0]);
      id1 = ent.id;
      expect(ent).toBeInstanceOf(People);
      const ent2 = await resourceController.addOne(peopleDto[1]);
      id2 = ent2.id;
      expect(ent2).toBeInstanceOf(People);
    });

    it.failing('dublicate value', async () => {
      await resourceController.addOne(peopleDto[1]);
    });
  });

  describe('get film', () => {
    it('correct values', async () => {
      expect(await resourceController.getOneById({ id: id1 })).toBeInstanceOf(
        People,
      );
    });
    it.failing('incorrect value', async () => {
      await resourceController.getOneById({ id: -1 });
    });
  });

  describe('get many film', () => {
    it('correct values', async () => {
      expect(
        await resourceController.getMany({ page: 1, limit: 10 }),
      ).toBeInstanceOf(Pagination);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, peopleDto[0]);
    });
  });

  describe('update film', () => {
    it('correct values', async () => {
      expect(
        await resourceController.updeteOne(
          { id: id1 },
          { ...peopleDto[0], name: 'New name' },
        ),
      ).toBeInstanceOf(People);
    });
    it.failing('incorrect value', async () => {
      await resourceController.updeteOne({ id: -1 }, peopleDto[0]);
    });
  });

  describe('patch update film', () => {
    it('correct values', async () => {
      expect(
        await resourceController.patchUpdeteOne({ id: id2 }, { name: 'New' }),
      ).toBeInstanceOf(People);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, peopleDto[0]);
    });
  });

  describe('delete film', () => {
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
