import { IocContainerConfig } from '@/core/ioc/ioc-container';
import { IOC_CONTAINER_CONFIG_SHARED } from '@/core/ioc/shared.config';

import { ErrorTrackerProvider } from '@/core/service/error-tracker/error-tracker-provider';
// import { ErrorTrackerProviderSentryImpl } from '@/core/service/error-tracker/sentry-error-tracker-provider';
import { ErrorTrackerProviderDevImpl } from '@/core/service/error-tracker/dev-error-tracker-provider';
// import { GaTrackerServiceImpl } from '@/core/service/tracker/ga-tracker.service';
import { DevTrackerServiceImpl } from '@/core/service/tracker/dev-tracker.service';
import { TrackerService } from '@/core/service/tracker/tracker.service';


export const IOC_CONTAINER_CONFIG_PROD: IocContainerConfig = {
  units: [
    ...IOC_CONTAINER_CONFIG_SHARED.units,
    { identifier: ErrorTrackerProvider, implementer: ErrorTrackerProviderDevImpl },
    // { identifier: TrackerService, implementer: GaTrackerServiceImpl },
    { identifier: TrackerService, implementer: DevTrackerServiceImpl },
  ],
};
