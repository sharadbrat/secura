import { UserEntity, UserEntityId } from '@/core/entity/user';
import { UserRepository } from '@/core/repository/user/user.repository';


/**
 * @class UserRepositoryHttpImpl
 * @extends UserRepository
 * @public
 */
export class UserRepositoryHttpImpl extends UserRepository {

  public patch(id: UserEntityId, model: Partial<UserEntity>): Promise<UserEntity> {
    // TODO: add impl once we have backend for it
    return Promise.reject(new Error('Method not implemented.'));
  }

}
