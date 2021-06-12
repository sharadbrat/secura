import { inject, injectable } from 'inversify';

import { UseCase } from '@/core/use-case/base-use-case';
import { Theme } from '@/core/entity/theme';
import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';


@injectable()
export class SetThemeUseCase implements UseCase {

  public constructor(
    @inject(PersistenceService) private persistenceService: PersistenceService,
    @inject(StoreProviderService) private store: StoreProviderService,
  ) {
  }

  public async perform(theme: Theme): Promise<Theme> {
    this.persistenceService.storeValue(PersistenceServiceValueName.THEME, theme);
    this.store.commit('themes/setTheme', theme);
    return theme;
  }

}
