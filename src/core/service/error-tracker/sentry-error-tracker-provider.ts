import { inject } from 'inversify';

import { ErrorTrackerProvider } from '@/core/service/error-tracker/error-tracker-provider';
import { ConfigService } from '@/core/service/config/config.service';


/**
 * @interface Sentry
 * @private
 */
interface Sentry {
  init(options: { dsn: string }): void;

  captureMessage(message: string): string;

  captureException(error: Error): string;
}


/**
 * @class ErrorTrackerProviderSentryImpl
 * @extends ErrorTrackerProvider
 * @public
 */
export class ErrorTrackerProviderSentryImpl extends ErrorTrackerProvider {

  /**
   * @property {Sentry} sentry
   * @private
   */
  private sentry: Sentry;


  /**
   * Injects config service.
   * @constructor
   * @param {ConfigService} configService
   * @public
   */
  public constructor(@inject(ConfigService) private configService: ConfigService) {
    super();
  }


  /**
   * @method setup
   * @return {Promise<void>}
   * @public
   */
  public setup(): Promise<void> {
    if (this.sentry) {
      return Promise.resolve();
    }

    return this.fetchSentryBundle().then(sentry => {
      const config = this.configService.frontendConfig;
      const sentryTrackingConfig = config.trackingConfig.sentry!;
      this.sentry = sentry;
      this.sentry.init(sentryTrackingConfig);
    });
  }

  /**
   * @method captureError
   * @param {Error} error
   * @return {Promise<void>}
   * @public
   */
  public captureError(error: Error): Promise<void> {
    try {
      this.sentry.captureException(error);
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.resolve();
  }

  /**
   * @method captureMessage
   * @param {string} message
   * @return {Promise<void>}
   * @public
   */
  public captureMessage(message: string): Promise<void> {
    try {
      this.sentry.captureMessage(message);
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.resolve();
  }

  /**
   * @method fetchSentryBundle
   * @return {Promise<Sentry>}
   * @private
   */
  private fetchSentryBundle(): Promise<Sentry> {
    return import('@sentry/browser');
  }

}
