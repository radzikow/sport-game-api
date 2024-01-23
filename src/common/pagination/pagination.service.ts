import { Repository, SelectQueryBuilder } from 'typeorm';
import { decodeCursor, createConnection } from './pagination.utils';
import { Connection } from './pagination.types';
import { PaginationArgs } from './pagination.args';

export class PaginationService<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async paginate(
    queryBuilder: SelectQueryBuilder<T>,
    { after, before, first, last }: PaginationArgs,
    entityAlias: string,
  ): Promise<Connection<T>> {
    if (last) {
      queryBuilder.orderBy(`${entityAlias}.id`, 'DESC');
    } else {
      queryBuilder.orderBy(`${entityAlias}.id`, 'ASC');
    }

    if (after) {
      const id = decodeCursor(after);
      queryBuilder.andWhere(`${entityAlias}.id > :id`, { id });
    }

    if (before) {
      const id = decodeCursor(before);
      queryBuilder.andWhere(`${entityAlias}.id < :id`, { id });
    }

    if (first) {
      queryBuilder.take(first);
    } else if (last) {
      queryBuilder.take(last);
    }

    let items = await queryBuilder.getMany();

    if (last && items.length > last) {
      items = items.slice(1);
      items.reverse();
    }

    const totalCount = await this.repository.count();

    return createConnection(items, totalCount, { after, before, first, last });
  }
}
