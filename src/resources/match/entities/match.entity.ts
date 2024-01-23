import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EntityAlias } from '../../../common/shared/entity-alias.enum';
import { Participation } from '../../../resources/participation/entities/participation.entity';

@Entity({ name: EntityAlias.Match })
@ObjectType()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  location: string;

  @CreateDateColumn()
  @Field()
  dateTime: Date;

  @OneToMany(() => Participation, (participation) => participation.match)
  participations: Participation[];
}
