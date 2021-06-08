import { inject, injectable } from 'inversify';

import { ServiceEntity } from '@/core/entity/service';
import { UseCase } from '@/core/use-case/base-use-case';
import { ServicesRepository } from '@/core/repository/services/services.repository';


@injectable()
export class AddServiceUseCase implements UseCase {

  public constructor(@inject(ServicesRepository) private servicesRepository: ServicesRepository) {
  }

  public perform(entity: ServiceEntity): Promise<ServiceEntity> {
    return this.servicesRepository.create(entity);
  }

}
