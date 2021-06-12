import { inject, injectable } from 'inversify';
import aes from 'crypto-js/aes';

import { UseCase } from '@/core/use-case/base-use-case';
import { ServicesRepository } from '@/core/repository/services/services.repository';

@injectable()
export class ExportUseCase implements UseCase {

  public constructor(@inject(ServicesRepository) private servicesRepository: ServicesRepository) {
  }

  public async perform(encryptionKey: string): Promise<string> {
    const services = await this.servicesRepository.list();
    const base64String = btoa(unescape(encodeURIComponent(JSON.stringify(services))));
    return aes.encrypt(base64String, encryptionKey).toString();
  }

}
