import { inject, injectable } from 'inversify';

import { UserRepository } from '@/core/repository/user/user.repository';
import { UseCase } from '@/core/use-case/base-use-case';
import { UserEntity } from '@/core/entity/user';


@injectable()
export class MeUseCase implements UseCase {

  public constructor(@inject(UserRepository) private userRepository: UserRepository) {
  }


  public perform(): Promise<UserEntity> {
    return this.userRepository.me();
  }

}
