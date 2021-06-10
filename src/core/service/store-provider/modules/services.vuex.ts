import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { ServicesStoreModuleState } from '@/core/service/store-provider/store-state';
import { ServiceEntity, ServiceEntityId } from '@/core/entity/service';


/**
 * @class ServicesStoreModule
 * @extends VuexModule
 * @implements ServicesStoreModuleState
 * @public
 */
@Module({ namespaced: true })
export class ServicesStoreModule extends VuexModule implements ServicesStoreModuleState {

  public services: ServiceEntity[] = [];

  @Mutation
  public setServices(services: ServiceEntity[]) {
    this.services = services;
  }

  @Mutation
  public addService(service: ServiceEntity) {
    this.services = [...this.services, service];
  }

  @Mutation
  public removeService(serviceId: ServiceEntityId) {
    this.services = this.services.filter(el => el.id !== serviceId);
  }

  @Mutation
  public updateService(service: ServiceEntity) {
    const index = this.services.findIndex(el => el.id === service.id);
    const newServices = [...this.services];
    newServices[index] = service;
    this.services = newServices;
  }

}
