import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { KeysStoreModuleState } from '@/core/service/store-provider/store-state';


/**
 * @class KeysStoreModule
 * @extends VuexModule
 * @implements KeysStoreModuleState
 * @public
 */
@Module({ namespaced: true })
export class KeysStoreModule extends VuexModule implements KeysStoreModuleState {

  public masterKey: string = '';

  public isPersisted: boolean = false;

  @Mutation
  public setMasterKey(value: string) {
    this.masterKey = value;
  }

  @Mutation
  public setPersisted(value: boolean) {
    this.isPersisted = value;
  }

}
