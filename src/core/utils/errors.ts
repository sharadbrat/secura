/**
 * @enum ServerErrorType
 * @public
 */
export enum ServerErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  TRIP_NOT_FOUND = 'TRIP_NOT_FOUND',
  USER_EXISTS = 'USER_EXISTS',
  WRONG_EMAIL_OR_PASS = 'WRONG_EMAIL_OR_PASS',
  USER_IS_NOT_CONFIRMED = 'USER_IS_NOT_CONFIRMED',
  OAUTH_PROBLEM = 'OAUTH_PROBLEM',
  EMAIL_SERVICE_UNAVAILABLE = 'EMAIL_SERVICE_UNAVAILABLE',
}


/**
 * @class ServerError
 * @extends Error
 * @public
 */
export class ServerError extends Error {

  public constructor(
    public readonly original: Error,
    public readonly type: ServerErrorType,
  ) {
    super();
  }

}


/**
 * @class UndefinedError
 * @extends Error
 * @public
 */
export class UndefinedError extends Error {

  public constructor(public readonly original: Error) {
    super('Unexpected error occured. Our developers have already started fixing it!');
  }

}
