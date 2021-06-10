import { injectable } from 'inversify';

import { Repository, RepositoryRequestParams } from '@/core/repository/repository';
import { ImageEntity, ImageEntityId } from '@/core/entity/image';


/**
 * @class ImageRepository
 * @implements Repository<ImageEntity, ImageEntityId>
 * @abstract
 * @public
 */
@injectable()
export abstract class ImageRepository implements Repository<ImageEntity, ImageEntityId> {

  public abstract list(params?: RepositoryRequestParams): Promise<ImageEntity[]>;

}
