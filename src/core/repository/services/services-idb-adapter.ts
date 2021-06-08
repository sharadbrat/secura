import { ServiceEntity } from '@/core/entity/service';
import { RepositoryAdapter } from '@/core/repository/adapter';


/**
 * @interface ServiceEntityDTO
 */
export interface ServiceEntityDTO {
  id: string;
  color: string;
  name: string;
  pictureId: string;
}


/**
 * @class ServicesIdbAdapter
 * @implements RepositoryAdapter<ServiceEntity, ServiceEntityDTO>
 * @public
 */
export class ServicesIdbAdapter extends RepositoryAdapter<ServiceEntity, ServiceEntityDTO> {

  public deserialize(dto: ServiceEntityDTO): ServiceEntity {
    return new ServiceEntity({
      id: dto.id,
      color: dto.color,
      name: dto.name,
      pictureId: dto.pictureId,
    });
  }

  public serialize(model: ServiceEntity): ServiceEntityDTO {
    return {
      id: model.id,
      color: model.color,
      name: model.name,
      pictureId: model.pictureId,
    };
  }

}
