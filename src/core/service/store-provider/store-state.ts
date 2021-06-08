import { ServiceEntity } from '@/core/entity/service';
import { UserEntity } from '@/core/entity/user';


/**
 * @interface UsersStoreModuleState
 * @public
 */
export interface UsersStoreModuleState {
  user: UserEntity;
}

/**
 * @interface KeysStoreModuleState
 * @public
 */
export interface KeysStoreModuleState {
  masterKey: string;
  isPersisted: boolean;
}

/**
 * @interface ServicesStoreModuleState
 * @public
 */
export interface ServicesStoreModuleState {
  services: ServiceEntity[];
}


/**
 * @interface StoreState
 * @public
 */
export interface StoreState {
  users: UsersStoreModuleState;
  keys: KeysStoreModuleState;
  services: ServicesStoreModuleState;
}
