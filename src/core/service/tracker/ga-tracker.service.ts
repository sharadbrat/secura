import { UserEntity } from '@/core/entity/user';
import { ConfigService, FrontendConfig } from '@/core/service/config/config.service';
import { injectScript } from '@/core/utils/inject';
import { inject } from 'inversify';
import { TrackerService } from './tracker.service';


const ANALYTICS_SCRIPT_PROD = 'https://www.google-analytics.com/analytics.js';
const ANALYTICS_SCRIPT_DEV = 'https://www.google-analytics.com/analytics_debug.js';


class GAInitializationError extends Error {

  public constructor(message: string) {
    super(`[GaTrackerService] Could not initialize: ${message}`);
  }

}


/**
 * Google Analytics tracker.
 * @class GaTrackerService
 * @extends TrackerService
 * @public
 */
export class GaTrackerServiceImpl extends TrackerService {

  public constructor(@inject(ConfigService) private configService: ConfigService) {
    super();

    const config = this.configService.frontendConfig;

    if (!config.trackingConfig.ga || !config.trackingConfig.ga.resourseId) {
      throw new GAInitializationError('config error');
    }

    this.createGATracker(config);

    this.injectGAScript();
  }

  private createGATracker(config: FrontendConfig) {
    // GA command queue code taken from https://developers.google.com/analytics/devguides/collection/analyticsjs/
    // @ts-ignore
    // eslint-disable-next-line
    window.ga = window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

    // @ts-ignore
    ga('create', config.trackingConfig.ga.resourseId, 'auto');
  }

  private injectGAScript() {
    const isProd = process.env.NODE_ENV === 'production';
    const url = isProd ? ANALYTICS_SCRIPT_PROD : ANALYTICS_SCRIPT_DEV;
    injectScript(url);
  }

  private handleGa(command: string, ...options: any[]) {
    // @ts-ignore
    window.ga(command, ...options);
  }

  public pageView(page: string) {
    this.handleGa('set', 'page', page);
    this.handleGa('set', 'location', window.location.pathname);
    this.handleGa('send', 'pageview');
  }

  public event(category: string, name: string) {
    this.handleGa('send', 'event', {
      eventCategory: category,
      eventAction: name,
    });
  }

  public setUser(user: UserEntity) {
    this.handleGa('set', 'userId', user.id);
  }

}
