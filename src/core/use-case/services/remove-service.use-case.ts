import { inject, injectable } from 'inversify';

import { ServiceEntity, ServiceEntityId } from '@/core/entity/service';
import { UseCase } from '@/core/use-case/base-use-case';
import { ServicesRepository } from '@/core/repository/services/services.repository';


@injectable()
export class RemoveServiceUseCase implements UseCase {

  public constructor(@inject(ServicesRepository) private servicesRepository: ServicesRepository) {
  }

  public perform(id: ServiceEntityId): Promise<ServiceEntity> {
    return this.servicesRepository.delete(id);
  }

}
