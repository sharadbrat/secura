import { inject } from 'inversify';

import { ErrorTrackerProvider } from '@/core/service/error-tracker/error-tracker-provider';
import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';


/**
 * @class ErrorTrackerServiceProvidedImpl
 * @public
 */
export class ErrorTrackerServiceProvidedImpl extends ErrorTrackerService {

  public constructor(@inject(ErrorTrackerProvider) private trackerProvider: ErrorTrackerProvider) {
    super();
  }


  public setupErrorTracking(): Promise<void> {
    return this.trackerProvider.setup();
  }


  public captureError(error: Error): Promise<void> {
    return this.trackerProvider.captureError(error);
  }


  public captureMessage(message: string): Promise<void> {
    return this.trackerProvider.captureMessage(message);
  }

}
