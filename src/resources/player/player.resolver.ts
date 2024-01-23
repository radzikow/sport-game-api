import {
  Resolver,
  Query,
  Args,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import * as DataLoader from 'dataloader';
import { Team } from '../team/entities/team.entity';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { PlayerConnection } from './player.type';
import { Match } from '../match/entities/match.entity';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private playerService: PlayerService) {}

  @Query(() => Player, { name: 'player' })
  async getPlayer(@Args('id') id: string): Promise<Player> {
    return this.playerService.findOne(id);
  }

  @Query(() => PlayerConnection, { name: 'players' })
  async getPlayers(@Args() args: PaginationArgs): Promise<PlayerConnection> {
    return this.playerService.findAll(args);
  }

  @ResolveField(() => Team, { name: 'team' })
  async getTeam(
    @Parent() player: Player,
    @Context('teamLoader') teamLoader: DataLoader<string, Team>,
  ): Promise<Team> {
    return teamLoader.load(player.teamId);
  }

  @ResolveField(() => [Match], { name: 'matches' })
  async getMatches(
    @Parent() player: Player,
    @Context('matchLoader') matchLoader: DataLoader<string, Match>,
  ): Promise<(Match | Error)[]> {
    return matchLoader.loadMany(
      player.participations.map((participation) => participation.matchId),
    );
  }
}
