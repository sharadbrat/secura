import { injectable } from 'inversify';
import { IDBPDatabase } from 'idb';


export enum IdbObjectStores {
  SERVICES = 'services',
}


/**
 * @class IdbService
 * @abstract
 * @public
 */
@injectable()
export abstract class IdbService {

  public abstract get db(): Promise<IDBPDatabase>;

}
