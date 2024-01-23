import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchResolver, MatchService],
  exports: [MatchService],
})
export class MatchModule {}
