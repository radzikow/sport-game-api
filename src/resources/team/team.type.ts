import { Field, ObjectType } from '@nestjs/graphql';
import { Team } from './entities/team.entity';
import { Connection, Edge } from '../../common/pagination/pagination.types';

@ObjectType()
export class TeamEdge extends Edge<Team> {
  @Field(() => Team)
  node: Team;
}

@ObjectType()
export class TeamConnection extends Connection<Team> {
  @Field(() => [TeamEdge])
  edges: TeamEdge[];
}
