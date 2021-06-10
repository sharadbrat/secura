import { inject, injectable } from 'inversify';

import { ImageEntity } from '@/core/entity/image';
import { UseCase } from '@/core/use-case/base-use-case';
import { ImageRepository } from '@/core/repository/image/image.repository';


@injectable()
export class ListImagesUseCase implements UseCase {

  public constructor(@inject(ImageRepository) private imageRepository: ImageRepository) {
  }

  public perform(): Promise<ImageEntity[]> {
    return this.imageRepository.list();
  }

}
