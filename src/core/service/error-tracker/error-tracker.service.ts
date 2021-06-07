import { injectable } from 'inversify';


/**
 * @class ErrorTrackerService
 * @public
 */
@injectable()
export abstract class ErrorTrackerService {

  /**
   * @method setupErrorTracking
   * @public
   */
  public abstract setupErrorTracking(): Promise<void>;


  /**
   * @method captureError
   * @param {Error} error
   * @return {Promise<void>}
   * @public
   */
  public abstract captureError(error: Error): Promise<void>;


  /**
   * @method captureMessage
   * @param {string} message
   * @return {Promise<void>}
   * @public
   */
  public abstract captureMessage(message: string): Promise<void>;

}
