import { ApiProperty } from '@nestjs/swagger';

class PaginationMeta {
  @ApiProperty({ example: 1 })
  itemCount: number;

  @ApiProperty({ example: 1 })
  totalItems?: number;

  @ApiProperty({ example: 10 })
  itemsPerPage: number;

  @ApiProperty({ example: 1 })
  totalPages?: number;

  @ApiProperty({ example: 1 })
  currentPage: number;
}

class PaginationLinks {
  @ApiProperty({ example: 'http://localhost:3000/api/people?limit=4' })
  first: string;

  @ApiProperty({ example: 'http://localhost:3000/api/people?page=2&limit=4' })
  previous: string;

  @ApiProperty({ example: 'http://localhost:3000/api/people?page=4&limit=4' })
  next: string;

  @ApiProperty({ example: 'http://localhost:3000/api/people?page=21&limit=4' })
  last: string;
}

export class PaginatedDto<TData> {
  items: TData[];
  @ApiProperty()
  meta: PaginationMeta;
  @ApiProperty()
  links: PaginationLinks;
}
