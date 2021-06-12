import { inject, injectable } from 'inversify';

import { UseCase } from '@/core/use-case/base-use-case';
import { ThemeEntity, Theme } from '@/core/entity/theme';
import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';


@injectable()
export class GetThemeUseCase implements UseCase {

  public constructor(
    @inject(PersistenceService) private persistenceService: PersistenceService,
    @inject(StoreProviderService) private store: StoreProviderService,
  ) {
  }

  public async perform(): Promise<Theme> {
    let savedTheme = this.persistenceService.loadValue(PersistenceServiceValueName.THEME) as Theme;
    if (!savedTheme) {
      savedTheme = ThemeEntity.DEFAULT;
      this.persistenceService.storeValue(PersistenceServiceValueName.THEME, savedTheme);
    }

    this.store.commit('themes/setTheme', savedTheme);

    return savedTheme;
  }

}
