import { Injectable, PipeTransform } from '@nestjs/common';
import { PagDto } from '../dto/pag.dto';
export const DEFAULT_COUNT = 10;
@Injectable()
export class DefaultPagValuePipe
  implements PipeTransform<Partial<PagDto>, PagDto>
{
  transform(value: Partial<PagDto>) {
    const page = value.page ? (value.page >= 1 ? value.page : 1) : 1;
    const limit = value.limit
      ? value.limit >= 0
        ? value.limit
        : 0
      : DEFAULT_COUNT;

    return { page, limit };
  }
}
