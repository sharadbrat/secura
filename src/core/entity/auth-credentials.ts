import { EmailField, NameField } from '@/core/entity/entity-base';


/**
 * @type UserPasswordField
 * @public
 */
export type UserPasswordField = string;


/**
 * @interface UserModel
 * @public
 */
export interface LoginCredentialsConstructorParams {
  password: UserPasswordField;
  email: EmailField;
}


/**
 * @interface UserModel
 * @public
 */
export interface RegisterCredentialsConstructorParams extends LoginCredentialsConstructorParams {
  name: NameField;
}


export class CredentialsValidator {

  /**
   * @constant {RegExp} EMAIL_REGEX
   * @public
   */
  // eslint-disable-next-line max-len
  public static readonly EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

  /**
   * Allows latin chars in lower and upper cases, numbers, "." and "_" signs.
   * @constant {RegExp} NAME_SYMBOLS_REGEX
   * @public
   */
  public static readonly NAME_SYMBOLS_REGEX = /^[a-zA-Z1-90._]+$/;


  public isPasswordValid(password: UserPasswordField): boolean {
    if (!password) {
      return false;
    }

    if (password.length < 6 || password.length > 20) {
      return false;
    }

    return true;
  }

  public isEmailValid(email: EmailField): boolean {
    if (!email) {
      return false;
    }

    return CredentialsValidator.EMAIL_REGEX.test(email);
  }

  public isNameValid(name: NameField): boolean {
    if (!name) {
      return false;
    }

    if (name.length < 3) {
      return false;
    }

    if (!CredentialsValidator.NAME_SYMBOLS_REGEX.test(name)) {
      return false;
    }

    if (name.startsWith('.') || name.startsWith('_') || name.endsWith('.') || name.endsWith('_')) {
      return false;
    }

    if (name.includes('..') || name.includes('__') || name.includes('._') || name.includes('_.')) {
      return false;
    }

    return true;
  }

}


/**
 * @class LoginCredentials
 * @public
 */
export class LoginCredentialsEntity {

  public password: UserPasswordField;

  public email: EmailField;

  private validator: CredentialsValidator;

  public constructor(params: LoginCredentialsConstructorParams) {
    this.password = params.password;
    this.email = params.email;
    this.validator = new CredentialsValidator();
  }

  public get isValid(): boolean {
    return this.isPasswordValid && this.isEmailValid;
  }

  public get isPasswordValid(): boolean {
    return this.validator.isPasswordValid(this.password);
  }

  public get isEmailValid(): boolean {
    return this.validator.isEmailValid(this.email);
  }

}


/**
 * @class RegisterCredentials
 * @public
 */
export class RegisterCredentialsEntity {

  public password: UserPasswordField;

  public email: EmailField;

  public name: NameField;

  private validator: CredentialsValidator;

  public constructor(params: RegisterCredentialsConstructorParams) {
    this.password = params.password;
    this.email = params.email;
    this.name = params.name;
    this.validator = new CredentialsValidator();
  }

  public get isValid(): boolean {
    return this.isPasswordValid && this.isEmailValid && this.isNameValid;
  }

  public get isPasswordValid(): boolean {
    return this.validator.isPasswordValid(this.password);
  }

  public get isEmailValid(): boolean {
    return this.validator.isEmailValid(this.email);
  }

  public get isNameValid(): boolean {
    return this.validator.isNameValid(this.name);
  }

}
