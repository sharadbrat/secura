import { IdbObjectStores, IdbService } from '@/core/service/idb/idb.service';
import { IDBPDatabase, openDB } from 'idb';


/**
 * @class IdbImplService
 * @extends IdbService
 * @public
 */
export class IdbImplService extends IdbService {

  private static readonly DB_NAME: string = 'secura-database';

  private dbPromise: Promise<IDBPDatabase>;

  public get db(): Promise<IDBPDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = openDB(IdbImplService.DB_NAME, 1, {
        upgrade: db => db.createObjectStore(IdbObjectStores.SERVICES),
      });
    }

    return this.dbPromise;
  }

}
