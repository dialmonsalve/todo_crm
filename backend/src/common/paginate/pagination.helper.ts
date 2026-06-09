import { PaginationDto } from '../dto/paginate.dto';

import { PaginatedResult } from './interface';

export class PaginationHelper {
  static createResponse<T>(
    data: T[],
    total: number,
    paginationDto: PaginationDto,
  ): PaginatedResult<T> {
    const { page = 0, limit = 10 } = paginationDto;
    const lastPage = Math.ceil(total / limit);

    const next =
      page < lastPage ? `?page=${page + 1}&limit=${limit}` : null;

    const prev = page > 1 ? `?page=${page - 1}&limit=${limit}` : null;

    return {
      data,
      meta: {
        total,
        page,
        lastPage,
        next,
        prev,
      },
    };
  }
}
