import { inject } from 'inversify';
import sha256 from 'crypto-js/sha256';

import { ServiceEntity, ServiceEntityId } from '@/core/entity/service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { IdbObjectStores, IdbService } from '@/core/service/idb/idb.service';
import { ServicesRepository } from '@/core/repository/services/services.repository';
import { ServiceEntityDTO, ServicesIdbAdapter } from '@/core/repository/services/services-idb-adapter';


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

  public async create(entity: ServiceEntity): Promise<ServiceEntity> {
    const db = await this.idbService.db;
    const id = sha256(entity.name).toString();

    const newEntity = new ServiceEntity({
      id,
      name: entity.name,
      color: entity.color,
      pictureId: entity.pictureId,
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

}
