import { Theme } from '@/core/entity/theme';
import { ImageEntity } from '@/core/entity/image';
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
 * @interface ThemesStoreModuleState
 * @public
 */
export interface ThemesStoreModuleState {
  theme: Theme;
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
 * @interface ImagesStoreModuleState
 * @public
 */
export interface ImagesStoreModuleState {
  images: ImageEntity[];
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
  images: ImagesStoreModuleState;
}
