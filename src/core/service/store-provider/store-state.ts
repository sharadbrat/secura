import { UserEntity } from '@/core/entity/user';


/**
 * @interface UsersStoreModuleState
 * @public
 */
export interface UsersStoreModuleState {
  user: UserEntity;
}


/**
 * @interface StoreState
 * @public
 */
export interface StoreState {
  users: UsersStoreModuleState;
}
