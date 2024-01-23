import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { Player } from '../resources/player/entities/player.entity';
import { Match } from '../resources/match/entities/match.entity';
import { Team } from '../resources/team/entities/team.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { createPlayerLoader } from '../resources/player/player.loader';
import { PlayerModule } from '../resources/player/player.module';
import { PlayerService } from '../resources/player/player.service';
import { createTeamLoader } from '../resources/team/team.loader';
import { TeamModule } from '../resources/team/team.module';
import { TeamService } from '../resources/team/team.service';
import { ParticipationModule } from '../resources/participation/participation.module';
import { ParticipationService } from '../resources/participation/participation.service';
import { createParticipationLoader } from '../resources/participation/participation.loader';
import { Participation } from '../resources/participation/entities/participation.entity';
import { createMatchLoader } from '../resources/match/match.loader';
import { MatchService } from '../resources/match/match.service';
import { MatchModule } from '../resources/match/match.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Player, Team, Match, Participation]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [PlayerModule, TeamModule, MatchModule, ParticipationModule],
      useFactory: (
        playerService: PlayerService,
        teamService: TeamService,
        matchService: MatchService,
        participationService: ParticipationService,
      ) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: () => ({
          playerLoader: createPlayerLoader(playerService),
          teamLoader: createTeamLoader(teamService),
          matchLoader: createMatchLoader(matchService),
          participationLoader: createParticipationLoader(participationService),
        }),
      }),
      inject: [PlayerService, TeamService, MatchService, ParticipationService],
    }),
  ],
})
export class DatabaseModule {}
