import { DataLoaderFactory } from '../../common/dataloader/dataloader.factory';
import { Player } from './entities/player.entity';
import { PlayerService } from './player.service';

export function createPlayerLoader(playerService: PlayerService) {
  const playerLoaderFactory = new DataLoaderFactory<Player>(
    playerService,
    (player: Player) => player.id,
  );
  return playerLoaderFactory.createLoader();
}
