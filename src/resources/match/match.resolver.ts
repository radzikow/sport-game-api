import {
  Args,
  Context,
  Parent,
  Query,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { MatchConnection } from './match.type';
import * as DataLoader from 'dataloader';
import { Player } from '../player/entities/player.entity';
import { Team } from '../team/entities/team.entity';

@Resolver(() => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Query(() => Match, { name: 'match' })
  async getMatch(@Args('id') id: string): Promise<Match> {
    const getMatchData = await this.matchService.findOne(id);
    return getMatchData;
  }

  @Query(() => MatchConnection, { name: 'matches' })
  async getMatches(@Args() args: PaginationArgs): Promise<MatchConnection> {
    return this.matchService.findAll(args);
  }

  @ResolveField(() => [Player], { name: 'players' })
  async getParticipants(
    @Parent() match: Match,
    @Context('playerLoader') playerLoader: DataLoader<string, Player>,
  ): Promise<(Player | Error)[]> {
    return playerLoader.loadMany(
      match.participations.map((participation) => participation.playerId),
    );
  }

  @ResolveField(() => [Team], { name: 'teams' })
  async getTeams(
    @Parent() match: Match,
    @Context('teamLoader') teamLoader: DataLoader<string, Team>,
  ): Promise<(Team | Error)[]> {
    return teamLoader.loadMany(
      match.participations.map((participation) => participation.teamId),
    );
  }
}
