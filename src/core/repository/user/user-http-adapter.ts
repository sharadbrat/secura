import { UserEntity } from '@/core/entity/user';
import { RepositoryAdapter } from '@/core/repository/adapter';
import { UserEntityDTO } from '@/core/repository/user/user.repository';


/**
 * @class UserHttpAdapter
 * @implements RepositoryAdapter<UserEntity, UserEntityDTO>
 * @public
 */
export class UserHttpAdapter extends RepositoryAdapter<UserEntity, UserEntityDTO> {

  public deserialize(dto: UserEntityDTO): UserEntity {
    return new UserEntity({
      id: dto.id,
      email: dto.email,
      name: dto.name,
    });
  }

  public serialize(model: UserEntity): UserEntityDTO {
    return {
      id: model.id,
      email: model.email,
      name: model.name,
    };
  }

}
