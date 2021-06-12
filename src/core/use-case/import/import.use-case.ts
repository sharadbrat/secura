import { inject, injectable } from 'inversify';
import aes from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

import { UseCase } from '@/core/use-case/base-use-case';
import { ServicesRepository } from '@/core/repository/services/services.repository';
import { ServiceEntity } from '@/core/entity/service';


@injectable()
export class ImportUseCase implements UseCase {

  public constructor(@inject(ServicesRepository) private servicesRepository: ServicesRepository) {
  }

  public async perform(cipher: string, encryptionKey: string): Promise<void> {
    const base64String = aes.decrypt(cipher, encryptionKey).toString(encUtf8);
    const services = JSON.parse(decodeURIComponent(escape(atob(base64String))));
    const entities = services.map(el => new ServiceEntity({
      id: el.id,
      color: el.color,
      name: el.name,
      pictureId: el.pictureId,
    }));

    await this.servicesRepository.setList(entities);
  }

}
