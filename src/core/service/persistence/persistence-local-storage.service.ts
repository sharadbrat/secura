import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';


/**
 * @class PersistenceServiceLocalStorageImpl
 * @extends PersistenceService
 * @public
 */
export class PersistenceServiceLocalStorageImpl extends PersistenceService {

  private STORAGE_NAMESPACE = '[vue-clean-architecture-boilerplate]';

  public storeValue(valueName: PersistenceServiceValueName, value: string): boolean {
    if (!window.localStorage) {
      return false;
    }

    window.localStorage.setItem(this.getValuePath(valueName), value);
    return true;
  }

  public loadValue(valueName: PersistenceServiceValueName): string {
    if (!window.localStorage) {
      return null;
    }

    return window.localStorage.getItem(this.getValuePath(valueName));
  }

  public clearValue(valueName: PersistenceServiceValueName): boolean {
    if (!window.localStorage) {
      return false;
    }

    window.localStorage.removeItem(this.getValuePath(valueName));
    return true;
  }

  private getValuePath(valueName: PersistenceServiceValueName): string {
    return `${this.STORAGE_NAMESPACE}[${valueName}]`;
  }

}
