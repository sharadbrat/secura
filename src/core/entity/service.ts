import sha256 from 'crypto-js/sha256';

import { ColorField, NameField } from '@/core/entity/entity-base';


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
  pictureId: PictureId;
}


/**
 * @class ServiceEntity
 * @public
 */
export class ServiceEntity {

  public id: ServiceEntityId;

  public color: ColorField;

  public name: NameField;

  public pictureId: PictureId;

  public constructor(params: ServiceEntityConstructorParams) {
    this.id = params.id;
    this.color = params.color;
    this.name = params.name;
    this.pictureId = params.pictureId;
  }

  public getPassword(masterKey: string): string {
    return sha256(masterKey + this.id).toString().substring(0, 16);
  }

}
