import { injectable } from 'inversify';
import { StoreState } from './store-state';


/**
 * @class StoreProviderService
 * @public
 */
@injectable()
export abstract class StoreProviderService<StoreType = any> {

  public abstract getStore(): StoreType;

  public abstract commit<Payload>(path: string, payload: Payload, options?: any): void;

  public abstract getState(): StoreState;

}
