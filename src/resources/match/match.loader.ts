import * as Dataloader from 'dataloader';
import { Match } from './entities/match.entity';
import { MatchService } from './match.service';
import { deriveMapFromArray } from '../../common/dataloader/dataloader.utils';

export function createMatchLoader(matchService: MatchService) {
  return new Dataloader<string, Match>(async (keys: string[]) => {
    const match = await matchService.findByIds(keys);
    const matchMap = deriveMapFromArray(match, (post: Match) => post.id);

    return keys.map((id) => matchMap.get(id));
  });
}
