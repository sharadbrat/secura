import { inject } from 'inversify';

import { ServiceEntity, ServiceEntityId } from '@/core/entity/service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { IdbObjectStores, IdbService } from '@/core/service/idb/idb.service';
import { ServicesRepository } from '@/core/repository/services/services.repository';
import { ServiceEntityDTO, ServicesIdbAdapter } from '@/core/repository/services/services-idb-adapter';
import { generateUUID } from '@/core/utils/generate-uuid';


/**
 * @class ServicesRepositoryIdbImpl
 * @extends ServicesRepository
 * @public
 */
export class ServicesRepositoryIdbImpl extends ServicesRepository {

  public constructor(
    @inject(IdbService) private idbService: IdbService,
    @inject(StoreProviderService) private store: StoreProviderService,
    private idbAdapter: ServicesIdbAdapter = new ServicesIdbAdapter(),
  ) {
    super();
  }

  public async list(): Promise<ServiceEntity[]> {
    const db = await this.idbService.db;
    const dtos: ServiceEntityDTO[] = await db.getAll(IdbObjectStores.SERVICES);
    const entities = this.idbAdapter.deserializeList(dtos);

    this.store.commit('services/setServices', entities);

    return entities;
  }

  public async setList(services: ServiceEntity[]): Promise<ServiceEntity[]> {
    const db = await this.idbService.db;

    await db.clear(IdbObjectStores.SERVICES);
    const promises = services.map(el => {
      const dto = this.idbAdapter.serialize(el);
      return db.put(IdbObjectStores.SERVICES, dto, el.id);
    });

    await Promise.all(promises);

    this.store.commit('services/setServices', services);

    return services;
  }

  public async create(entity: ServiceEntity): Promise<ServiceEntity> {
    const db = await this.idbService.db;
    const id = generateUUID();

    const newEntity = new ServiceEntity({
      id,
      name: entity.name,
      color: entity.color,
      pictureId: entity.pictureId,
      createdAt: Date.now(),
    });
    const dto = this.idbAdapter.serialize(newEntity);

    await db.put(IdbObjectStores.SERVICES, dto, dto.id);

    this.store.commit('services/addService', newEntity);

    return newEntity;
  }

  public async delete(id: ServiceEntityId): Promise<ServiceEntity> {
    const db = await this.idbService.db;
    const dto: ServiceEntityDTO = await db.get(IdbObjectStores.SERVICES, id);
    const entity = this.idbAdapter.deserialize(dto);
    await db.delete(IdbObjectStores.SERVICES, id);

    this.store.commit('services/removeService', id);

    return entity;
  }

  public async update(id: ServiceEntityId, entity: ServiceEntity): Promise<ServiceEntity> {
    const db = await this.idbService.db;
    const dto = this.idbAdapter.serialize(entity);
    await db.put(IdbObjectStores.SERVICES, dto, id);

    this.store.commit('services/updateService', entity);

    return entity;
  }

  public async deleteAll(): Promise<ServiceEntity[]> {
    const db = await this.idbService.db;
    await db.clear(IdbObjectStores.SERVICES);

    const dtos: ServiceEntityDTO[] = await db.getAll(IdbObjectStores.SERVICES);
    const entities = this.idbAdapter.deserializeList(dtos);

    this.store.commit('services/clear', null);

    return entities;
  }

}
