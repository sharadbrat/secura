import { injectable } from 'inversify';


export enum PersistenceServiceValueName {
  MASTER_KEY = 'master_key',
}


/**
 * @class PersistenceService
 * @abstract
 * @public
 */
@injectable()
export abstract class PersistenceService {

  public static readonly VALUE_NAME = PersistenceServiceValueName;

  public abstract storeValue(valueName: PersistenceServiceValueName, token: string): boolean;

  public abstract loadValue(valueName: PersistenceServiceValueName): string;

  public abstract clearValue(valueName: PersistenceServiceValueName): boolean;

}
