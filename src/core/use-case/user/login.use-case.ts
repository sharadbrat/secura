import { inject, injectable } from 'inversify';

import { LoginCredentialsEntity } from '@/core/entity/auth-credentials';
import { UserRepository, UserAuthToken } from '@/core/repository/user/user.repository';
import { UseCase } from '@/core/use-case/base-use-case';
import { ServerError, ServerErrorType } from '@/core/utils/errors';


export class LoginUseCaseValidationError extends Error {

  public constructor() {
    super('The login information was entered incorrectly');
  }

}


export class LoginUseCaseNotFoundError extends Error {

  public constructor() {
    super('No user with this email was found');
  }

}


export class LoginUseCaseWrongCredentialsError extends Error {

  public constructor() {
    super('Incorrect password or email');
  }

}


@injectable()
export class LoginUseCase implements UseCase {

  public constructor(@inject(UserRepository) private userRepository: UserRepository) {
  }

  public perform(credentials: LoginCredentialsEntity): Promise<UserAuthToken> {
    return this.userRepository.login(credentials)
      .catch((error: ServerError) => {
        if (error.type === ServerErrorType.VALIDATION_ERROR) {
          throw new LoginUseCaseValidationError();
        }

        if (error.type === ServerErrorType.USER_NOT_FOUND) {
          throw new LoginUseCaseNotFoundError();
        }

        if (error.type === ServerErrorType.WRONG_EMAIL_OR_PASS) {
          throw new LoginUseCaseWrongCredentialsError();
        }

        throw error;
      });
  }

}
