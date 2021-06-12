import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { ThemeEntity, Theme } from '@/core/entity/theme';
import { ThemesStoreModuleState } from '@/core/service/store-provider/store-state';


/**
 * @class ThemesStoreModule
 * @extends VuexModule
 * @implements ThemesStoreModuleState
 * @public
 */
@Module({ namespaced: true })
export class ThemesStoreModule extends VuexModule implements ThemesStoreModuleState {

  public theme = ThemeEntity.DEFAULT;

  @Mutation
  public setTheme(theme: Theme) {
    this.theme = theme;
  }

}
