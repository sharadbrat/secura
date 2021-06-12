import { IocContainerConfig } from '@/core/ioc/ioc-container';
import { IOC_CONTAINER_CONFIG_SHARED } from '@/core/ioc/shared.config';

import { ErrorTrackerProvider } from '@/core/service/error-tracker/error-tracker-provider';
import { ErrorTrackerProviderDevImpl } from '@/core/service/error-tracker/dev-error-tracker-provider';
import { DevTrackerServiceImpl } from '@/core/service/tracker/dev-tracker.service';
import { TrackerService } from '@/core/service/tracker/tracker.service';


export const IOC_CONTAINER_CONFIG_DEV: IocContainerConfig = {
  units: [
    ...IOC_CONTAINER_CONFIG_SHARED.units,
    { identifier: TrackerService, implementer: DevTrackerServiceImpl },
    { identifier: ErrorTrackerProvider, implementer: ErrorTrackerProviderDevImpl },
  ],
};
