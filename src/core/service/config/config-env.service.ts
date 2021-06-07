import { injectable } from 'inversify';

import { ConfigService, FrontendConfig } from '@/core/service/config/config.service';


/**
 * @class ConfigServiceEnvImpl
 * @public
 */
@injectable()
export class ConfigServiceEnvImpl extends ConfigService {

  public getFrontendConfig(): FrontendConfig {
    return this.frontendConfig;
  }


  /**
   * @property {FrontendConfig} frontendConfig
   * @private
   */
  private readonly frontendConfig: FrontendConfig = {
    apiGateway: process.env.VUE_APP_API_GATEWAY,
    rootUrl: process.env.VUE_APP_ROOT_URL,
    trackingConfig: {
      sentry: {
        environment: process.env.NODE_ENV,
        dsn: process.env.VUE_APP_SENTRY_API_KEY,
      },
      ga: {
        resourseId: process.env.VUE_APP_GA_RESOURCE_ID,
      },
    },
    oauth: {
      google: {
        client_id: process.env.VUE_APP_GOOGLE_API_CLIENT_ID,
      },
    },
  };

}
