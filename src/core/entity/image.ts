import { NameField, UrlField } from '@/core/entity/entity-base';


/**
 * @type ImageEntityId
 * @public
 */
export type ImageEntityId = string;


/**
 * @type ImageType
 * @public
 */
export type ImageType = 'emoji' | 'logo';


/**
 * @interface ImageEntityConstructorParams
 * @public
 */
export interface ImageEntityConstructorParams {
  id: ImageEntityId;
  name: NameField;
  url: UrlField;
  type: ImageType;
}


/**
 * @class ImageEntity
 * @public
 */
export class ImageEntity {

  public id: ImageEntityId;

  public name: NameField;

  public url: UrlField;

  public type: ImageType;

  public constructor(params: ImageEntityConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.url = params.url;
    this.type = params.type;
  }

}
