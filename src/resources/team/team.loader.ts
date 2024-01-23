import * as Dataloader from 'dataloader';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';
import { deriveMapFromArray } from '../../common/dataloader/dataloader.utils';

export function createTeamLoader(teamService: TeamService) {
  return new Dataloader<string, Team>(async (keys: string[]) => {
    const team = await teamService.findByIds(keys);
    const teamMap = deriveMapFromArray(team, (post: Team) => post.id);

    return keys.map((id) => teamMap.get(id));
  });
}
