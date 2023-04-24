import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Pagination } from 'nestjs-typeorm-paginate';
import { INestApplication } from '@nestjs/common';
import { CreateSpecieDto } from 'src/swapi/specie/dto/create-specie.dto';
import { SpecieController } from 'src/swapi/specie/specie.controller';
import { Specie } from 'src/swapi/specie/specie.entity';
const speciesDto: CreateSpecieDto[] = [
  {
    name: 'Human12',
    classification: 'mammal',
    designation: 'sentient',
    average_height: '180',
    skin_colors: 'caucasian, black, asian, hispanic',
    hair_colors: 'blonde, brown, black, red',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    average_lifespan: '120',
    language: 'Galactic Basic',
  },
  {
    name: 'Dro2id',
    classification: 'artificial',
    designation: 'sentient',
    average_height: 'n/a',
    skin_colors: 'n/a',
    hair_colors: 'n/a',
    eye_colors: 'n/a',
    average_lifespan: 'indefinite',
    language: 'n/a',
  },
];
describe('Specie integration test', () => {
  let resourceController: SpecieController;
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

    resourceController = module.get(SpecieController);
  });

  afterAll(() => {
    module.close();
  });

  it('controller shoud be defined', () => {
    expect(resourceController).toBeDefined();
  });

  describe('create specie', () => {
    it('correct values', async () => {
      const ent = await resourceController.addOne(speciesDto[0]);
      id1 = ent.id;
      expect(ent).toBeInstanceOf(Specie);
      const ent2 = await resourceController.addOne(speciesDto[1]);
      id2 = ent2.id;
      expect(ent2).toBeInstanceOf(Specie);
    });

    it.failing('dublicate value', async () => {
      await resourceController.addOne(speciesDto[1]);
    });
  });

  describe('get specie', () => {
    it('correct values', async () => {
      expect(await resourceController.getOneById({ id: id1 })).toBeInstanceOf(
        Specie,
      );
    });
    it.failing('incorrect value', async () => {
      await resourceController.getOneById({ id: -1 });
    });
  });

  describe('get many specie', () => {
    it('correct values', async () => {
      expect(
        await resourceController.getMany({ page: 1, limit: 10 }),
      ).toBeInstanceOf(Pagination);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, speciesDto[0]);
    });
  });

  describe('update specie', () => {
    it('correct values', async () => {
      expect(
        await resourceController.updeteOne(
          { id: id1 },
          { ...speciesDto[0], name: 'New name' },
        ),
      ).toBeInstanceOf(Specie);
    });
    it.failing('incorrect value', async () => {
      await resourceController.updeteOne({ id: -1 }, speciesDto[0]);
    });
  });

  describe('patch update specie', () => {
    it('correct values', async () => {
      expect(
        await resourceController.patchUpdeteOne({ id: id2 }, { name: 'New' }),
      ).toBeInstanceOf(Specie);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, speciesDto[0]);
    });
  });

  describe('delete specie', () => {
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
