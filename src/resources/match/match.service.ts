import { Injectable } from '@nestjs/common';
import { Match } from './entities/match.entity';
import { PaginationService } from '../../common/pagination/pagination.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { EntityAlias } from '../../common/shared/entity-alias.enum';
import { MatchConnection } from './match.type';

@Injectable()
export class MatchService extends PaginationService<Match> {
  constructor(
    @InjectRepository(Match)
    repository: Repository<Match>,
  ) {
    super(repository);
  }

  async findOne(id: string): Promise<Match> {
    return this.repository
      .createQueryBuilder(EntityAlias.Match)
      .leftJoinAndSelect(
        `${EntityAlias.Match}.participations`,
        EntityAlias.Participation,
      )
      .leftJoin(`${EntityAlias.Participation}.team`, EntityAlias.Team)
      .addSelect(`${EntityAlias.Team}.id`)
      .leftJoin(`${EntityAlias.Participation}.player`, EntityAlias.Player)
      .addSelect(`${EntityAlias.Player}.id`)
      .where(`${EntityAlias.Match}.id = :id`, { id })
      .getOne();
  }

  async findAll(paginationArgs: PaginationArgs): Promise<MatchConnection> {
    const queryBuilder = this.repository
      .createQueryBuilder(EntityAlias.Match)
      .leftJoinAndSelect(
        `${EntityAlias.Match}.participations`,
        EntityAlias.Participation,
      )
      .leftJoin(`${EntityAlias.Participation}.player`, EntityAlias.Player)
      .addSelect(`${EntityAlias.Player}.id`);

    return this.paginate(queryBuilder, paginationArgs, EntityAlias.Match);
  }

  async findByIds(ids: string[]): Promise<Match[]> {
    return this.repository
      .createQueryBuilder(EntityAlias.Match)
      .where(`${EntityAlias.Match}.id IN (:...ids)`, { ids })
      .getMany();
  }
}
