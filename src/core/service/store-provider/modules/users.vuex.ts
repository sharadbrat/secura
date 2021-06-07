import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { UserEntity } from '@/core/entity/user';
import { UsersStoreModuleState } from '@/core/service/store-provider/store-state';


/**
 * @class UsersStoreModule
 * @extends VuexModule
 * @implements UsersStoreModuleState
 * @public
 */
@Module({ namespaced: true })
export class UsersStoreModule extends VuexModule implements UsersStoreModuleState {

  public user = null;

  @Mutation
  public setUser(user: UserEntity) {
    this.user = user;
  }

}
