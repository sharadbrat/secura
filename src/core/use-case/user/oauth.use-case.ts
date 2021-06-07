import { inject, injectable } from 'inversify';

import { OauthToken, UserAuthToken, UserRepository } from '@/core/repository/user/user.repository';
import { UseCase } from '@/core/use-case/base-use-case';
import { ServerError, ServerErrorType } from '@/core/utils/errors';


export class OauthUseCaseExternalProblemError extends Error {

  public constructor() {
    super('Authorization through a third-party system failed. Try again in a few minutes.');
  }

}


@injectable()
export class OauthUseCase implements UseCase {

  public constructor(@inject(UserRepository) private userRepository: UserRepository) {
  }

  public perform(oauthToken?: OauthToken): Promise<UserAuthToken> {
    return this.userRepository.oauth(oauthToken)
      .catch((error: ServerError) => {
        if (error.type === ServerErrorType.OAUTH_PROBLEM) {
          throw new OauthUseCaseExternalProblemError();
        }

        throw error;
      });
  }

}
