import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Team } from '../../team/entities/team.entity';
import { EntityAlias } from '../../../common/shared/entity-alias.enum';
import { Participation } from '../../../resources/participation/entities/participation.entity';

@Entity({ name: EntityAlias.Player })
@ObjectType()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name?: string;

  @Column()
  @Field()
  surname: string;

  @Column()
  @Field(() => Int)
  number: number;

  @ManyToOne(() => Team, (team: Team) => team.players)
  @JoinColumn()
  @Field(() => Team)
  team: Team;

  @Column()
  @Field()
  teamId: string;

  @OneToMany(() => Participation, (participation) => participation.player)
  participations: Participation[];
}
