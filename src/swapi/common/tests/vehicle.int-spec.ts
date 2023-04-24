import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { Pagination } from 'nestjs-typeorm-paginate';
import { INestApplication } from '@nestjs/common';
import { CreateVehicleDto } from 'src/swapi/vehicle/dto/create-vehicle.dto';
import { VehicleController } from 'src/swapi/vehicle/vehicle.controller';
import { Vehicle } from 'src/swapi/vehicle/vehicle.entity';

const vehiclesDto: CreateVehicleDto[] = [
  {
    name: 'T-16 skyhopper12',
    model: 'T-16 skyhopper',
    manufacturer: 'Incom Corporation',
    cost_in_credits: '14500',
    length: '10.4 ',
    max_atmosphering_speed: '1200',
    crew: '1',
    passengers: '1',
    cargo_capacity: '50',
    consumables: '0',
    vehicle_class: 'repulsorcraft',
  },
  {
    name: 'X-34 landspee2der',
    model: 'X-34 landspeeder',
    manufacturer: 'SoroSuub Corporation',
    cost_in_credits: '10550',
    length: '3.4 ',
    max_atmosphering_speed: '250',
    crew: '1',
    passengers: '1',
    cargo_capacity: '5',
    consumables: 'unknown',
    vehicle_class: 'repulsorcraft',
  },
];
describe('Vehicle integration test', () => {
  let resourceController: VehicleController;
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

    resourceController = module.get(VehicleController);
  });

  afterAll(() => {
    module.close();
  });

  it('controller shoud be defined', () => {
    expect(resourceController).toBeDefined();
  });

  describe('create vehicle', () => {
    it('correct values', async () => {
      const ent = await resourceController.addOne(vehiclesDto[0]);
      id1 = ent.id;
      expect(ent).toBeInstanceOf(Vehicle);
      const ent2 = await resourceController.addOne(vehiclesDto[1]);
      id2 = ent2.id;
      expect(ent2).toBeInstanceOf(Vehicle);
    });

    it.failing('dublicate value', async () => {
      await resourceController.addOne(vehiclesDto[1]);
    });
  });

  describe('get vehicle', () => {
    it('correct values', async () => {
      expect(await resourceController.getOneById({ id: id1 })).toBeInstanceOf(
        Vehicle,
      );
    });
    it.failing('incorrect value', async () => {
      await resourceController.getOneById({ id: -1 });
    });
  });

  describe('get many vehicle', () => {
    it('correct values', async () => {
      expect(
        await resourceController.getMany({ page: 1, limit: 10 }),
      ).toBeInstanceOf(Pagination);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, vehiclesDto[0]);
    });
  });

  describe('update vehicle', () => {
    it('correct values', async () => {
      expect(
        await resourceController.updeteOne(
          { id: id1 },
          { ...vehiclesDto[0], name: 'New name' },
        ),
      ).toBeInstanceOf(Vehicle);
    });
    it.failing('incorrect value', async () => {
      await resourceController.updeteOne({ id: -1 }, vehiclesDto[0]);
    });
  });

  describe('patch update vehicle', () => {
    it('correct values', async () => {
      expect(
        await resourceController.patchUpdeteOne({ id: id2 }, { name: 'New' }),
      ).toBeInstanceOf(Vehicle);
    });
    it.failing('incorrect value', async () => {
      await resourceController.patchUpdeteOne({ id: -1 }, vehiclesDto[0]);
    });
  });

  describe('delete vehicle', () => {
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
