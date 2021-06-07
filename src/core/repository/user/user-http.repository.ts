import { inject } from 'inversify';

import { UserEntity, UserEntityId } from '@/core/entity/user';
import {
  UserRepository,
  UserAuthToken,
  UserLoginCredentialsDTO,
  UserRegisterCredentialsDTO,
  UserEntityDTO,
  OauthToken,
  UserOauthDTO,
} from '@/core/repository/user/user.repository';
import { UserHttpAdapter } from '@/core/repository/user/user-http-adapter';
import { NetworkService } from '@/core/service/network/network.service';
import { LoginCredentialsEntity, RegisterCredentialsEntity } from '@/core/entity/auth-credentials';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';


/**
 * @interface AuthResponseModel
 * @public
 */
export interface AuthResponseModel {
  token: string;
}


/**
 * @class UserRepositoryHttpImpl
 * @extends UserRepository
 * @public
 */
export class UserRepositoryHttpImpl extends UserRepository {

  public constructor(
    @inject(NetworkService) private network: NetworkService,
    @inject(StoreProviderService) private storeProviderService: StoreProviderService,
    private adapter: UserHttpAdapter = new UserHttpAdapter(),
  ) {
    super();
  }

  public login(model: LoginCredentialsEntity): Promise<UserAuthToken> {
    const loginUrl = this.network.environment.users.login;
    const payload = this.adapter.serializeLoginCredentials(model);
    return this.network.post<AuthResponseModel, UserLoginCredentialsDTO>(loginUrl, payload)
      .then(response => response.data.token);
  }

  public oauth(token: OauthToken): Promise<UserAuthToken> {
    const url = this.network.environment.users.oauth;
    const payload = this.adapter.serializeOauthToken(token);
    return this.network.post<AuthResponseModel, UserOauthDTO>(url, payload)
      .then(response => response.data.token);
  }

  public register(model: RegisterCredentialsEntity): Promise<UserAuthToken> {
    const registerUrl = this.network.environment.users.register;
    const payload = this.adapter.serializeRegisterCredentials(model);
    return this.network.post<AuthResponseModel, UserRegisterCredentialsDTO>(registerUrl, payload)
      .then(response => response.data.token);
  }

  public me(): Promise<UserEntity> {
    const meUrl = this.network.environment.users.me;
    return this.network.get<UserEntityDTO>(meUrl)
      .then(response => {
        const user: UserEntity = this.adapter.deserialize(response.data);
        this.storeProviderService.commit<UserEntity>('users/setUser', user);
        return user;
      });
  }

  public patch(id: UserEntityId, model: Partial<UserEntity>): Promise<UserEntity> {
    // TODO: add impl once we have backend for it
    return Promise.reject(new Error('Method not implemented.'));
  }

  public forgotPassword(email: string): Promise<void> {
    const url = this.network.environment.users.sendRestorePassword;
    const payload = this.adapter.serializeForgotPasswordPayload(email);
    return this.network.post(url, payload).then();
  }

}
