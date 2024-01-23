import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participation])],
  providers: [ParticipationService],
  exports: [ParticipationService],
})
export class ParticipationModule {}
