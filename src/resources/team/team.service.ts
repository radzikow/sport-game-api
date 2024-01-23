import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { PaginationService } from '../../common/pagination/pagination.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { EntityAlias } from '../../common/shared/entity-alias.enum';
import { TeamConnection } from './team.type';

@Injectable()
export class TeamService extends PaginationService<Team> {
  constructor(
    @InjectRepository(Team)
    repository: Repository<Team>,
  ) {
    super(repository);
  }

  async findOne(id: string): Promise<Team> {
    return this.repository
      .createQueryBuilder(EntityAlias.Team)
      .leftJoin(`${EntityAlias.Team}.players`, EntityAlias.Player)
      .addSelect(`${EntityAlias.Player}.id`)
      .where(`${EntityAlias.Team}.id = :id`, { id })
      .getOne();
  }

  async findAll(paginationArgs: PaginationArgs): Promise<TeamConnection> {
    const queryBuilder = this.repository
      .createQueryBuilder(EntityAlias.Team)
      .leftJoin(`${EntityAlias.Team}.players`, EntityAlias.Player)
      .addSelect(`${EntityAlias.Player}.id`);

    return this.paginate(queryBuilder, paginationArgs, EntityAlias.Team);
  }

  async findByIds(ids: string[]): Promise<Team[]> {
    return this.repository
      .createQueryBuilder(EntityAlias.Team)
      .leftJoinAndSelect(`${EntityAlias.Team}.players`, EntityAlias.Player)
      .where(`${EntityAlias.Team}.id IN (:...ids)`, { ids })
      .getMany();
  }
}
