import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TeamService } from './team.service';
import { Team } from './entities/team.entity';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import * as DataLoader from 'dataloader';
import { Player } from '../player/entities/player.entity';
import { TeamConnection } from './team.type';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => Team, { name: 'team' })
  async getTeam(@Args('id') id: string): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Query(() => TeamConnection, { name: 'teams' })
  async getTeams(@Args() args: PaginationArgs): Promise<TeamConnection> {
    return this.teamService.findAll(args);
  }

  @ResolveField(() => [Player], { name: 'players' })
  async getPlayers(
    @Parent() team: Team,
    @Context('playerLoader') playerLoader: DataLoader<string, Player>,
  ): Promise<(Player | Error)[]> {
    return playerLoader.loadMany(team.players.map((player) => player.id));
  }
}
