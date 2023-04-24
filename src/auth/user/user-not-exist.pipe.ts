import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserNotExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async transform(value: { username: string }) {
    const name = await this.userRepo.findOne({
      where: { username: value.username },
      select: ['username'],
    });
    if (name) throw new BadRequestException('This username already exist');
    return value;
  }
}
