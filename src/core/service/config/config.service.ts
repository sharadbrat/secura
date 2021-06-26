import { injectable } from 'inversify';


/**
 * @interface FrontendConfig
 * @public
 */
export interface FrontendConfig {
  apiGateway: string;
  rootUrl: string;
  trackingConfig: {
    sentry?: {
      environment: string;
      dsn: string;
    };
    ga?: {
      resourseId: string;
    };
  };
  oauth: {
    google?: {
      // eslint-disable-next-line camelcase
      client_id: string;
    };
  };
}


/**
 * @class ConfigService
 * @abstract
 * @public
 */
@injectable()
export abstract class ConfigService {

  /**
   * @get frontendConfig
   * @return FrontendConfig
   * @public
   */
  public abstract get frontendConfig(): FrontendConfig;

}
