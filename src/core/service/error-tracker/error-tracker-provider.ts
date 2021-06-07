import { injectable } from 'inversify';

/**
 * @class ErrorTrackerProvider
 * @abstract
 * @public
 */
@injectable()
export abstract class ErrorTrackerProvider {

  public abstract setup(): Promise<void>;

  public abstract captureError(error: Error): Promise<void>;

  public abstract captureMessage(message: string): Promise<void>;

}
