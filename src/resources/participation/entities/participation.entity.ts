import { Player } from '../../player/entities/player.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityAlias } from '../../../common/shared/entity-alias.enum';
import { Match } from '../../match/entities/match.entity';
import { Team } from '../../team/entities/team.entity';

@Entity({ name: EntityAlias.Participation })
export class Participation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.participations)
  player: Player;

  @Column()
  playerId: string;

  @ManyToOne(() => Team, (team) => team.participations)
  team: Team;

  @Column()
  teamId: string;

  @ManyToOne(() => Match, (match) => match.participations)
  match: Match;

  @Column()
  matchId: string;
}
