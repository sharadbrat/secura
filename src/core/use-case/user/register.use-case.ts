import { inject, injectable } from 'inversify';

import { RegisterCredentialsEntity } from '@/core/entity/auth-credentials';
import { UserRepository, UserAuthToken } from '@/core/repository/user/user.repository';
import { UseCase } from '@/core/use-case/base-use-case';
import { ServerError, ServerErrorType } from '@/core/utils/errors';


export class RegisterUseCaseValidationError extends Error {

  public constructor() {
    super('The data for registration was entered incorrectly');
  }

}


export class RegisterUseCaseUserExistsError extends Error {

  public constructor() {
    super('A user with this email already exists');
  }

}


@injectable()
export class RegisterUseCase implements UseCase {

  public constructor(@inject(UserRepository) private userRepository: UserRepository) {
  }

  public perform(credentials: RegisterCredentialsEntity): Promise<UserAuthToken> {
    return this.userRepository.register(credentials)
      .catch((error: ServerError) => {
        if (error.type === ServerErrorType.VALIDATION_ERROR) {
          throw new RegisterUseCaseValidationError();
        }

        if (error.type === ServerErrorType.USER_EXISTS) {
          throw new RegisterUseCaseUserExistsError();
        }

        throw error;
      });
  }

}
