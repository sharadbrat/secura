import { ErrorTrackerProvider } from '@/core/service/error-tracker/error-tracker-provider';

const SETUP_MESSAGE = '[DevErrorTrackerProvider] development error tracker has been successfully initialized. Verify this message does not appear in production';
const TRACKER_PROVIDER_WINDOW_TOKEN = 'TRACKER_PROVIDER';
const TRACKED_MESSAGES_LIMIT = 200;
const TRACKED_ERRORS_LIMIT = 50;


/**
 * @class ErrorTrackerProviderDevImpl
 * @extends ErrorTrackerProvider
 * @public
 */
export class ErrorTrackerProviderDevImpl extends ErrorTrackerProvider {

  /**
   * Contains errors that were sent to `captureError`.
   * @property {Error[]} trackedErrors
   * @public
   */
  public trackedErrors: Error[] = [];

  /**
   * Contains messages that were sent to `captureMessage`.
   * @property {string[]} trackedMessages
   * @public
   */
  public trackedMessages: string[] = [];

  /**
   * @method setup
   * @return {Promise<void>}
   * @public
   */
  public setup(): Promise<void> {
    window[TRACKER_PROVIDER_WINDOW_TOKEN] = this;

    const styles = 'color: indianred; background-color: black; display: inline-block; padding: 4px;';
    // eslint-disable-next-line no-console
    console.log(`%c${SETUP_MESSAGE}`, styles);

    return Promise.resolve();
  }

  /**
   * @method captureError
   * @param {Error} error
   * @return {Promise<void>}
   * @public
   */
  public captureError(error: Error): Promise<void> {
    this.trackedErrors = [...this.trackedErrors, error].slice(-TRACKED_ERRORS_LIMIT);
    return Promise.resolve();
  }

  /**
   * @method captureMessage
   * @param {string} message
   * @return {Promise<void>}
   * @public
   */
  public captureMessage(message: string): Promise<void> {
    this.trackedMessages = [...this.trackedMessages, message].slice(-TRACKED_MESSAGES_LIMIT);
    return Promise.resolve();
  }

}
