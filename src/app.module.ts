import { Module } from '@nestjs/common';
import { PlayerModule } from './resources/player/player.module';
import { TeamModule } from './resources/team/team.module';
import { MatchModule } from './resources/match/match.module';
import { DatabaseModule } from './database/database.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { DataloaderModule } from './common/dataloader/dataloader.module';
import { ParticipationModule } from './resources/participation/participation.module';

@Module({
  imports: [
    DatabaseModule,
    PaginationModule,
    DataloaderModule,
    PlayerModule,
    TeamModule,
    MatchModule,
    ParticipationModule,
  ],
})
export class AppModule {}
