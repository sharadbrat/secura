import sha256 from 'crypto-js/sha256';

import { ColorField, IntegerField, NameField } from '@/core/entity/entity-base';
import { ImageEntityId } from '@/core/entity/image';


/**
 * @type ServiceEntityId
 * @public
 */
export type ServiceEntityId = string;


/**
 * @type PictureId
 * @public
 */
export type PictureId = string;


/**
 * @interface UserEntityConstructorParams
 * @public
 */
export interface ServiceEntityConstructorParams {
  id: ServiceEntityId;
  name: NameField;
  color: ColorField;
  pictureId: ImageEntityId;
  createdAt: IntegerField;
}


/**
 * @class ServiceEntity
 * @public
 */
export class ServiceEntity {

  public id: ServiceEntityId;

  public color: ColorField;

  public name: NameField;

  public pictureId: ImageEntityId;

  public createdAt: IntegerField;

  public constructor(params: ServiceEntityConstructorParams) {
    this.id = params.id;
    this.color = params.color;
    this.name = params.name;
    this.pictureId = params.pictureId;
    this.createdAt = params.createdAt;
  }

  public getPassword(masterKey: string): string {
    return sha256(masterKey + this.id).toString().substring(0, 16);
  }

  public clone(): ServiceEntity {
    return new ServiceEntity({
      id: this.id,
      color: this.color,
      name: this.name,
      pictureId: this.pictureId,
      createdAt: this.createdAt,
    });
  }

}
