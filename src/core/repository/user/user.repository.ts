import { injectable } from 'inversify';

import { UserEntityId, UserEntity } from '@/core/entity/user';
import { Repository, RepositoryRequestParams } from '@/core/repository/repository';
import { LoginCredentialsEntity, RegisterCredentialsEntity } from '@/core/entity/auth-credentials';


/**
 * @type UserAuthToken
 * @public
 */
export type UserAuthToken = string;


/**
 * @type OauthToken
 * @public
 */
export type OauthToken = string;


/**
 * @type EmailConfirmationToken
 * @public
 */
export type EmailConfirmationToken = string;


/**
 * @interface EmailConfirmationTokenDTO
 * @public
 */
export interface EmailConfirmationTokenDTO {
  token: string;
}


/**
 * @interface UserEntityDTO
 * @public
 */
export interface UserEntityDTO {
  id?: UserEntityId;
  email?: string;
  name?: string;
  confirmed?: boolean;
}


/**
 * @interface UserRegisterCredentialsDTO
 * @public
 */
export interface UserRegisterCredentialsDTO {
  email: string;
  password: string;
  name: string;
}


/**
 * @interface UserLoginCredentialsDTO
 * @public
 */
export interface UserLoginCredentialsDTO {
  email: string;
  password: string;
}


/**
 * @interface UserOauthDTO
 * @public
 */
export interface UserOauthDTO {
  token: string;
}


/**
 * @interface PasswordRestoreDTO
 * @public
 */
export interface PasswordRestoreDTO {
  email: string;
}


/**
 * @class UserRepository
 * @implements Repository<UserModel, UserModelId>
 * @abstract
 * @public
 */
@injectable()
export abstract class UserRepository implements Repository<UserEntity, UserEntityId> {

  public abstract login(model: LoginCredentialsEntity): Promise<UserAuthToken>;

  public abstract register(model: RegisterCredentialsEntity): Promise<UserAuthToken>;

  public abstract me(params?: RepositoryRequestParams): Promise<UserEntity>;

  public abstract patch(id: UserEntityId, model: Partial<UserEntity>): Promise<UserEntity>;

  public abstract oauth(token: OauthToken): Promise<UserAuthToken>;

  public abstract forgotPassword(email: string): Promise<void>;

}
