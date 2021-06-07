import { EmailField, NameField } from '@/core/entity/entity-base';


/**
 * @type UserEntityId
 * @public
 */
export type UserEntityId = string;


/**
 * @interface UserEntityConstructorParams
 * @public
 */
export interface UserEntityConstructorParams {
  id: UserEntityId;
  email: EmailField;
  name: NameField;
}


/**
 * @class UserEntity
 * @public
 */
export class UserEntity {

  public id: UserEntityId;

  public email: EmailField;

  public name: NameField;

  public constructor(params: UserEntityConstructorParams) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
  }

}
