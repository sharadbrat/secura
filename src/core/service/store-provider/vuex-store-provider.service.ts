import Vuex, { Store } from 'vuex';
import Vue from 'vue';

import { UsersStoreModule } from '@/core/service/store-provider/modules/users.vuex';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { StoreState } from './store-state';


/**
 * @class VuexStoreProviderServiceImpl
 * @public
 */
export class VuexStoreProviderServiceImpl extends StoreProviderService<Store<StoreState>> {

  private store: Store<StoreState>;

  public constructor() {
    super();
    Vue.use(Vuex);

    this.store = new Store<StoreState>({
      // strict: true,
      modules: {
        users: UsersStoreModule,
      },
    });
  }

  public commit<Payload>(path: string, payload: Payload, options?: any): void {
    this.store.commit(path, payload, options);
  }

  public getState(): StoreState {
    return this.store.state;
  }

  public getStore(): Store<StoreState> {
    return this.store;
  }

}
