import { Injectable } from '@nestjs/common';
import { ResourceService } from '../common/resource.service';
import { IDiscriptionsPeople, IRelationsIDPeople } from './people.interface';
import { People } from './people.entity';
import { PeopleRepository } from './people.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PeopleService extends ResourceService<
  People,
  IDiscriptionsPeople,
  IRelationsIDPeople
> {
  constructor(
    peopleRepository: PeopleRepository,
    configService: ConfigService,
  ) {
    super(configService, peopleRepository);
  }
}
