import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Player } from '../../player/entities/player.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityAlias } from '../../../common/shared/entity-alias.enum';
import { Participation } from '../../../resources/participation/entities/participation.entity';

@Entity({ name: EntityAlias.Team })
@ObjectType()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Player, (player: Player) => player.team)
  @Field(() => [Player])
  players: Player[];

  @OneToMany(() => Participation, (participation) => participation.team)
  participations: Participation[];
}
