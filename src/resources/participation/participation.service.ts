import { Injectable } from '@nestjs/common';
import { Participation } from './entities/participation.entity';
import { PaginationService } from '../../common/pagination/pagination.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityAlias } from '../../common/shared/entity-alias.enum';
import { Repository } from 'typeorm';
import { ParticipationConnection } from './participation.type';

@Injectable()
export class ParticipationService extends PaginationService<Participation> {
  constructor(
    @InjectRepository(Participation)
    repository: Repository<Participation>,
  ) {
    super(repository);
  }

  async findOne(id: string): Promise<Participation> {
    return this.repository
      .createQueryBuilder(EntityAlias.Participation)
      .where(`${EntityAlias.Participation}.id = :id`, { id })
      .getOne();
  }

  async findAll(paginationArgs): Promise<ParticipationConnection> {
    const queryBuilder = this.repository
      .createQueryBuilder(EntityAlias.Participation)
      .orderBy(`${EntityAlias.Participation}.createdAt`, 'DESC');

    return this.paginate(
      queryBuilder,
      paginationArgs,
      EntityAlias.Participation,
    );
  }

  async findByIds(ids: string[]): Promise<Participation[]> {
    return this.repository
      .createQueryBuilder(EntityAlias.Participation)
      .where(`${EntityAlias.Participation}.id IN (:...ids)`, { ids })
      .leftJoinAndSelect(
        `${EntityAlias.Participation}.player`,
        EntityAlias.Player,
      )
      .getMany();
  }
}
