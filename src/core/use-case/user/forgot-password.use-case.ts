import { ServerError, ServerErrorType } from '@/core/utils/errors';
import { EmailField } from '@/core/entity/entity-base';
import { inject, injectable } from 'inversify';

import { UserRepository } from '@/core/repository/user/user.repository';
import { UseCase } from '@/core/use-case/base-use-case';


class ForgotPasswordUseCaseUserNotConfirmedError extends Error {

  public constructor() {
    super('This user has not yet confirmed his email');
  }

}


class ForgotPasswordUseCaseUserValidationError extends Error {

  public constructor() {
    super('Data entered incorrectly');
  }

}


class ForgotPasswordUseCaseUserNotFoundError extends Error {

  public constructor() {
    super('No user with this email was found');
  }

}


@injectable()
export class ForgotPasswordUseCase implements UseCase {

  public constructor(@inject(UserRepository) private userRepository: UserRepository) {
  }

  public perform(email: EmailField): Promise<void> {
    return this.userRepository.forgotPassword(email)
      .catch((error: ServerError) => {
        if (error.type === ServerErrorType.USER_IS_NOT_CONFIRMED) {
          throw new ForgotPasswordUseCaseUserNotConfirmedError();
        }

        if (error.type === ServerErrorType.VALIDATION_ERROR) {
          throw new ForgotPasswordUseCaseUserValidationError();
        }

        if (error.type === ServerErrorType.USER_NOT_FOUND) {
          throw new ForgotPasswordUseCaseUserNotFoundError();
        }

        throw error;
      });
  }

}
