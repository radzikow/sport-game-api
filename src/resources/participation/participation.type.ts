import { Field, ObjectType } from '@nestjs/graphql';
import { Participation } from './entities/participation.entity';
import { Connection, Edge } from '../../common/pagination/pagination.types';

@ObjectType()
export class ParticipationEdge extends Edge<Participation> {
  @Field(() => Participation)
  node: Participation;
}

@ObjectType()
export class ParticipationConnection extends Connection<Participation> {
  @Field(() => [ParticipationEdge])
  edges: ParticipationEdge[];
}
