import { DataLoaderFactory } from '../../common/dataloader/dataloader.factory';
import { Participation } from './entities/participation.entity';
import { ParticipationService } from './participation.service';

export function createParticipationLoader(
  participationService: ParticipationService,
) {
  const participationLoaderFactory = new DataLoaderFactory<Participation>(
    participationService,
    (participation: Participation) => participation.id,
  );
  return participationLoaderFactory.createLoader();
}
