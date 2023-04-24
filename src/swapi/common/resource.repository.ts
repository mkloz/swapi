import { NotFoundException } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IBackSetFields, ID, URL } from '../../common/common.interface';

export abstract class ResourceRepository<
  Entity extends IBackSetFields &
    ID &
    DiscriptionRes &
    Record<keyof RelationsIdRes, unknown>,
  DiscriptionRes,
  RelationsIdRes,
> {
  public constructor(
    protected readonly repository: Repository<Entity>,
    private readonly relations: Array<keyof RelationsIdRes & string>,
  ) {}

  public async create(
    discr: DiscriptionRes & URL & Partial<ID>,
    rel?: DeepPartial<RelationsIdRes>,
  ): Promise<Entity> {
    const { url } = discr;
    let ent = this.repository.create(discr as DeepPartial<Entity>);
    if (rel) {
      ent = await this.addRelations(ent, rel);
    }
    const people = await this.repository.save(ent);
    people.url = `${url}/${people.id}`;

    return await this.repository.save(people);
  }

  public async update(
    id: FindOptionsWhere<Entity>,
    discr?: DeepPartial<DiscriptionRes>,
    rel?: DeepPartial<RelationsIdRes>,
  ): Promise<Entity> {
    let ent = await this.repository.findOneBy(id);

    if (discr) {
      ent = this.repository.create({ ...ent, ...discr });
    }
    if (rel) {
      ent = await this.addRelations(ent, rel);
    }
    return await this.repository.save(ent);
  }

  public abstract addRelations(
    ent: DeepPartial<Entity>,
    rel: DeepPartial<RelationsIdRes>,
  ): Promise<Entity>;

  public async delete(id: FindOptionsWhere<Entity>): Promise<void> {
    const val = await this.repository.findOneBy(id);
    if (!val) {
      throw new NotFoundException();
    }
    await this.repository.remove(val);
  }

  public async getOneBy(id: FindOptionsWhere<Entity>): Promise<Entity> {
    const ent = (await this.findWithRelations({ where: id })).at(0);
    if (ent) {
      return ent;
    }
    throw new NotFoundException();
  }

  // async getMany({ offset, count }: PagOpt): Promise<Entity[]> {
  //   return await this.findWithRelations({ take: count, skip: offset });
  // }
  public getMany(opt: IPaginationOptions): Promise<Pagination<Entity>> {
    return paginate(this.repository, opt, { relations: this.relations });
  }

  public findWithRelations(options?: FindManyOptions<Entity>) {
    return this.repository.find({
      relations: this.relations,
      ...options,
    });
  }

  public async getExistingEntity<T extends ID>(
    repo: Repository<T>,
    entitiesId: number[],
  ): Promise<T[]> {
    return (
      await Promise.all(
        entitiesId.map(async (id) => {
          return await repo.findOneById(id);
        }),
      )
    ).filter((val) => val !== null);
  }
}
