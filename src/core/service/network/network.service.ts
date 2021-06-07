import { injectable } from 'inversify';


/**
 * @interface Environment
 * @public
 */
export interface Environment {
  base: string;

  users: {
    login: string;
    register: string;
    me: string;
    oauth: string;
    sendRestorePassword: string;
  };

}


/**
 * @interface NetworkRequestOptions
 * @public
 */
export interface NetworkRequestOptions {
  headers?: any;
  params?: any;
}


/**
 * @interface NetworkResponse
 * @public
 */
export interface NetworkResponse<T> {
  data: T;
  meta: object;
}


/**
 * @class NetworkService
 * @abstract
 * @public
 */
@injectable()
export abstract class NetworkService {

  public readonly environment: Environment;

  public abstract get<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;

  public abstract post<T, K>(url: string, body?: K, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;

  public abstract put<T, K>(url: string, body?: K, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;

  public abstract patch<T, K>(url: string, body?: K, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;

  public abstract delete<T, K>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;

}
