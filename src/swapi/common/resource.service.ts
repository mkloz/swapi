import { Injectable } from '@nestjs/common';
import { PagDto } from './dto/pag.dto';
import { ResourceRepository } from './resource.repository';
import { IBackSetFields, ID } from '../../common/common.interface';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ConfigService } from '@nestjs/config';
import { ISwapi } from 'src/configs/config';

@Injectable()
export abstract class ResourceService<
  Entity extends IBackSetFields &
    ID &
    DiscriptionRes &
    Record<keyof RelationsIdRes, unknown>,
  DiscriptionRes,
  RelationsIdRes,
> {
  public constructor(
    private readonly configService: ConfigService,
    private readonly repository: ResourceRepository<
      Entity,
      DiscriptionRes,
      RelationsIdRes
    >,
  ) {}

  public addOne(
    disc: DiscriptionRes,
    rel: DeepPartial<RelationsIdRes>,
  ): Promise<Entity> {
    return this.repository.create(
      {
        ...disc,
        url: this.configService.get<ISwapi>('swapi').projectUrl,
      },
      rel,
    );
  }

  public getOneBy(id: FindOptionsWhere<Entity>): Promise<Entity> {
    return this.repository.getOneBy(id);
  }

  public getMany(pag: PagDto): Promise<Pagination<Entity>> {
    return this.repository.getMany({
      ...pag,
      route: this.configService.get<ISwapi>('swapi').projectUrl,
    });
  }

  public patchUpdateBy(
    id: FindOptionsWhere<Entity>,
    disc: DeepPartial<DiscriptionRes>,
    relations: DeepPartial<RelationsIdRes>,
  ): Promise<Entity> {
    return this.repository.update(id, disc, relations);
  }

  public updateBy(
    id: FindOptionsWhere<Entity>,
    disc: DiscriptionRes,
    relations: DeepPartial<RelationsIdRes>,
  ): Promise<Entity> {
    return this.repository.update(id, disc, relations);
  }

  public deleteBy(id: FindOptionsWhere<Entity>): Promise<void> {
    return this.repository.delete(id);
  }
}
