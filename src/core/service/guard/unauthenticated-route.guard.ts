import { inject, injectable } from 'inversify';

import { Guard } from '@/core/service/guard/guard.model';
import { PersistenceService } from '@/core/service/persistence/persistence.service';


/**
 * Guard class for unauthenticated routes. If user does has valid token in
 * `PersistenceService`, then he is redirected to main page.
 *
 * @class UnauthenticatedRouteGuard
 * @implements Guard
 * @public
 */
@injectable()
export class UnauthenticatedRouteGuard implements Guard {

  public constructor(@inject(PersistenceService) private persistenceService: PersistenceService) {
  }

  public doGuard = (to, from, next) => {
    if (!this.persistenceService.loadValue(PersistenceService.VALUE_NAME.TOKEN)) {
      next();
    } else {
      next('trips');
    }
  }

}
