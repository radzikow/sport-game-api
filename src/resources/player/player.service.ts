import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { PaginationService } from '../../common/pagination/pagination.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { EntityAlias } from '../../common/shared/entity-alias.enum';
import { PlayerConnection } from './player.type';

@Injectable()
export class PlayerService extends PaginationService<Player> {
  constructor(
    @InjectRepository(Player)
    repository: Repository<Player>,
  ) {
    super(repository);
  }

  async findOne(id: string): Promise<Player> {
    return this.repository
      .createQueryBuilder(EntityAlias.Player)
      .leftJoin(`${EntityAlias.Player}.team`, EntityAlias.Team)
      .addSelect(`${EntityAlias.Team}.id`)
      .leftJoinAndSelect(
        `${EntityAlias.Player}.participations`,
        EntityAlias.Participation,
      )
      .leftJoin(`${EntityAlias.Participation}.match`, EntityAlias.Match)
      .addSelect(`${EntityAlias.Match}.id`)
      .where(`${EntityAlias.Player}.id = :id`, { id })
      .getOne();
  }

  async findAll(paginationArgs: PaginationArgs): Promise<PlayerConnection> {
    const queryBuilder = this.repository
      .createQueryBuilder(EntityAlias.Player)
      .leftJoin(`${EntityAlias.Player}.team`, EntityAlias.Team)
      .addSelect(`${EntityAlias.Team}.id`)
      .leftJoinAndSelect(
        `${EntityAlias.Player}.participations`,
        EntityAlias.Participation,
      );

    return this.paginate(queryBuilder, paginationArgs, EntityAlias.Player);
  }

  async findByIds(ids: string[]): Promise<Player[]> {
    return this.repository
      .createQueryBuilder(EntityAlias.Player)
      .where(`${EntityAlias.Player}.id IN (:...ids)`, { ids })
      .getMany();
  }
}
