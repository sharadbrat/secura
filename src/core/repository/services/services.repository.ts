import { injectable } from 'inversify';

import { UserEntityId } from '@/core/entity/user';
import { Repository, RepositoryRequestParams } from '@/core/repository/repository';
import { ServiceEntity, ServiceEntityId } from '@/core/entity/service';


/**
 * @interface UserEntityDTO
 * @public
 */
export interface UserEntityDTO {
  id?: UserEntityId;
  email?: string;
  name?: string;
}


/**
 * @class UserRepository
 * @implements Repository<ServiceEntity, ServiceEntityId>
 * @abstract
 * @public
 */
@injectable()
export abstract class ServicesRepository implements Repository<ServiceEntity, ServiceEntityId> {

  public abstract list(params?: RepositoryRequestParams): Promise<ServiceEntity[]>;

  public abstract create(model: ServiceEntity): Promise<ServiceEntity>;

  public abstract delete(id: ServiceEntityId): Promise<ServiceEntity>;

}
