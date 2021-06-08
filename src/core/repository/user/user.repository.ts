import { injectable } from 'inversify';

import { UserEntityId, UserEntity } from '@/core/entity/user';
import { Repository } from '@/core/repository/repository';


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
 * @implements Repository<UserModel, UserModelId>
 * @abstract
 * @public
 */
@injectable()
export abstract class UserRepository implements Repository<UserEntity, UserEntityId> {

  public abstract patch(id: UserEntityId, model: Partial<UserEntity>): Promise<UserEntity>;

}
