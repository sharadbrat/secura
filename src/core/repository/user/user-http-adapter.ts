import { LoginCredentialsEntity, RegisterCredentialsEntity } from '@/core/entity/auth-credentials';
import { UserEntity } from '@/core/entity/user';
import { RepositoryAdapter } from '@/core/repository/adapter';
import {
  UserEntityDTO,
  UserLoginCredentialsDTO,
  UserOauthDTO,
  UserRegisterCredentialsDTO,
  OauthToken,
  PasswordRestoreDTO,
  EmailConfirmationToken,
  EmailConfirmationTokenDTO,
} from '@/core/repository/user/user.repository';


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

  public serializeLoginCredentials(model: LoginCredentialsEntity): UserLoginCredentialsDTO {
    return {
      email: model.email,
      password: model.password,
    };
  }

  public serializeRegisterCredentials(model: RegisterCredentialsEntity): UserRegisterCredentialsDTO {
    return {
      email: model.email,
      password: model.password,
      name: model.name,
    };
  }

  public serializeOauthToken(token: OauthToken): UserOauthDTO {
    return { token };
  }

  public serializeForgotPasswordPayload(email: string): PasswordRestoreDTO {
    return { email };
  }

  public serializeEmailConfirmationToken(token: EmailConfirmationToken): EmailConfirmationTokenDTO {
    return { token };
  }

}
