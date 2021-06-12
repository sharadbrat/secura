import { inject, injectable } from 'inversify';

import { UseCase } from '@/core/use-case/base-use-case';
import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';


@injectable()
export class GetMasterKeyUseCase implements UseCase {

  public constructor(
    @inject(PersistenceService) private persistenceService: PersistenceService,
    @inject(StoreProviderService) private store: StoreProviderService,
  ) {
  }

  public async perform(): Promise<string> {
    const masterKey = this.persistenceService.loadValue(PersistenceServiceValueName.MASTER_KEY);
    if (masterKey) {
      this.store.commit('keys/setPersisted', true);
      this.store.commit('keys/setMasterKey', masterKey);
    }
    return masterKey;
  }

}
