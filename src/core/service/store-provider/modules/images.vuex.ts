import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { ImagesStoreModuleState } from '@/core/service/store-provider/store-state';
import { ImageEntity, ImageEntityId } from '@/core/entity/image';


/**
 * @class ImagesStoreModule
 * @extends VuexModule
 * @implements KeysStoreModuleState
 * @public
 */
@Module({ namespaced: true })
export class ImagesStoreModule extends VuexModule implements ImagesStoreModuleState {

  public images: ImageEntity[] = [];

  public get getById(): (id: ImageEntityId) => ImageEntity {
    return (id: ImageEntityId) => this.images.find(el => el.id === id);
  }

  public get emojis(): ImageEntity[] {
    return this.images.filter(el => el.type === 'emoji');
  }

  public get logos(): ImageEntity[] {
    return this.images.filter(el => el.type === 'logo');
  }

  @Mutation
  public setImages(images: ImageEntity[]) {
    this.images = images;
  }

}
