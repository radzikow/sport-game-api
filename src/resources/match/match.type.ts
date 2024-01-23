import { Field, ObjectType } from '@nestjs/graphql';
import { Match } from './entities/match.entity';
import { Connection, Edge } from '../../common/pagination/pagination.types';

@ObjectType()
export class MatchEdge extends Edge<Match> {
  @Field(() => Match)
  node: Match;
}

@ObjectType()
export class MatchConnection extends Connection<Match> {
  @Field(() => [MatchEdge])
  edges: MatchEdge[];
}
