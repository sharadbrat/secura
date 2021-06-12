import { inject, injectable } from 'inversify';

import { ServiceEntity } from '@/core/entity/service';
import { UseCase } from '@/core/use-case/base-use-case';
import { ServicesRepository } from '@/core/repository/services/services.repository';


@injectable()
export class RemoveAllServicesUseCase implements UseCase {

  public constructor(@inject(ServicesRepository) private servicesRepository: ServicesRepository) {
  }

  public perform(): Promise<ServiceEntity[]> {
    return this.servicesRepository.deleteAll();
  }

}
