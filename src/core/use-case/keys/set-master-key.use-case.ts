import { inject, injectable } from 'inversify';
import sha256 from 'crypto-js/sha256';

import { UseCase } from '@/core/use-case/base-use-case';
import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';

@injectable()
export class SetMasterKeyUseCase implements UseCase {

  public constructor(
    @inject(PersistenceService) private persistenceService: PersistenceService,
    @inject(StoreProviderService) private store: StoreProviderService,
  ) {
  }

  public async perform(masterKey: string, isStored: boolean = false): Promise<void> {
    if (!masterKey) {
      throw new Error('Master key can not be falsy value!');
    }

    const masterKeyHash = sha256(masterKey).toString();

    if (isStored) {
      this.persistenceService.storeValue(PersistenceServiceValueName.MASTER_KEY, masterKeyHash);
    }

    this.store.commit('keys/setMasterKey', masterKeyHash);
  }

}
