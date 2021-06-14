import { inject, injectable } from 'inversify';

import { UseCase } from '@/core/use-case/base-use-case';
import { ServicesRepository } from '@/core/repository/services/services.repository';
import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';


@injectable()
export class RemoveAllUseCase implements UseCase {

  public constructor(
    @inject(ServicesRepository) private servicesRepository: ServicesRepository,
    @inject(PersistenceService) private persistenceService: PersistenceService,
    @inject(StoreProviderService) private store: StoreProviderService,
  ) {
  }

  public async perform(): Promise<void> {
    this.servicesRepository.deleteAll();
    this.persistenceService.clearValue(PersistenceServiceValueName.MASTER_KEY);
    this.persistenceService.clearValue(PersistenceServiceValueName.THEME);
    const swCacheIsDeleted = await caches.delete('secura-cache');
    console.log(`Service worker cache is deleted: ${swCacheIsDeleted}!`);
    this.store.commit('keys/removeKey', null);
  }

}
