import { Field, ObjectType } from '@nestjs/graphql';
import { Player } from './entities/player.entity';
import { Connection, Edge } from '../../common/pagination/pagination.types';

@ObjectType()
export class PlayerEdge extends Edge<Player> {
  @Field(() => Player)
  node: Player;
}

@ObjectType()
export class PlayerConnection extends Connection<Player> {
  @Field(() => [PlayerEdge])
  edges: PlayerEdge[];
}
