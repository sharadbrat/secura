import { Route } from 'vue-router';
import { inject, injectable } from 'inversify';

import { UserEntity } from '@/core/entity/user';
import { Guard } from '@/core/service/guard/guard.model';
import { PersistenceService } from '@/core/service/persistence/persistence.service';
import { TrackerService } from '@/core/service/tracker/tracker.service';
import { MeUseCase } from '@/core/use-case/user/me.use-case';


/**
 * Guard class for authenticated routes. If user does not have valid token in
 * `PersistenceService`, then he is redirected to login page.
 *
 * @class AuthenticatedRouteGuard
 * @implements Guard
 * @public
 */
@injectable()
export class AuthenticatedRouteGuard implements Guard {

  public constructor(
    @inject(PersistenceService) private persistenceService: PersistenceService,
    @inject(MeUseCase) private meUseCase: MeUseCase,
    @inject(TrackerService) private trackerService: TrackerService,
  ) {
  }

  public doGuard = (to, from, next) => {
    const hasToken = Boolean(this.persistenceService.loadValue(PersistenceService.VALUE_NAME.TOKEN));
    if (hasToken) {
      this.meUseCase.perform().then(user => this.setupUserAndRedirect(user, next));
    } else {
      this.saveAfterLoginUrl(to);
      next('login');
    }
  }

  private setupUserAndRedirect(user: UserEntity, next: (path?: string) => void) {
    this.trackerService.setUser(user);
    const afterLoginUrl = this.getAfterLoginUrl();
    if (afterLoginUrl) {
      next(afterLoginUrl);
    } else {
      next();
    }
  }

  private saveAfterLoginUrl(route: Route) {
    const path = route.fullPath;
    if (path !== '/') {
      this.persistenceService.storeValue(PersistenceService.VALUE_NAME.AFTER_LOGIN_URL, path);
    }
  }

  private getAfterLoginUrl(): string {
    const url = this.persistenceService.loadValue(PersistenceService.VALUE_NAME.AFTER_LOGIN_URL);
    this.persistenceService.clearValue(PersistenceService.VALUE_NAME.AFTER_LOGIN_URL);
    return url;
  }

}
