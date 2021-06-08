import { IocContainerConfig } from '@/core/ioc/ioc-container';

import { ErrorTrackerProvider } from '@/core/service/error-tracker/error-tracker-provider';
import { ErrorTrackerProviderDevImpl } from '@/core/service/error-tracker/dev-error-tracker-provider';
import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';
import { ErrorTrackerServiceProvidedImpl } from '@/core/service/error-tracker/error-tracker-provided.service';
import { NetworkService } from '@/core/service/network/network.service';
import { NetworkServiceHttpImpl } from '@/core/service/network/network-http.service';
import { NotificationService } from '@/core/service/notification/notification.service';
import { NotificationServiceMapImpl } from '@/core/service/notification/notification-map.service';
import { PersistenceService } from '@/core/service/persistence/persistence.service';
import { PersistenceServiceLocalStorageImpl } from '@/core/service/persistence/persistence-local-storage.service';
import { ConfigService } from '@/core/service/config/config.service';
import { ConfigServiceEnvImpl } from '@/core/service/config/config-env.service';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { VuexStoreProviderServiceImpl } from '@/core/service/store-provider/vuex-store-provider.service';
import { DevTrackerServiceImpl } from '@/core/service/tracker/dev-tracker.service';
import { TrackerService } from '@/core/service/tracker/tracker.service';
import { IdbService } from '@/core/service/idb/idb.service';
import { IdbImplService } from '@/core/service/idb/idb-impl.service';

import { UserRepository } from '@/core/repository/user/user.repository';
import { UserRepositoryHttpImpl } from '@/core/repository/user/user-http.repository';
import { ServicesRepository } from '@/core/repository/services/services.repository';
import { ServicesRepositoryIdbImpl } from '@/core/repository/services/services-idb.repository';

import { SetMasterKeyUseCase } from '@/core/use-case/keys/set-master-key.use-case';
import { AddServiceUseCase } from '@/core/use-case/services/add-service.use-case';
import { RemoveServiceUseCase } from '@/core/use-case/services/remove-service.use-case';
import { ListServicesUseCase } from '@/core/use-case/services/list-services.use-case';


export const IOC_CONTAINER_CONFIG_DEV: IocContainerConfig = {
  units: [
    // services
    { identifier: NetworkService, implementer: NetworkServiceHttpImpl },
    { identifier: NotificationService, implementer: NotificationServiceMapImpl },
    { identifier: PersistenceService, implementer: PersistenceServiceLocalStorageImpl },
    { identifier: ErrorTrackerProvider, implementer: ErrorTrackerProviderDevImpl },
    { identifier: ErrorTrackerService, implementer: ErrorTrackerServiceProvidedImpl },
    { identifier: ConfigService, implementer: ConfigServiceEnvImpl },
    { identifier: StoreProviderService, implementer: VuexStoreProviderServiceImpl },
    { identifier: TrackerService, implementer: DevTrackerServiceImpl },
    { identifier: IdbService, implementer: IdbImplService },

    // data repositories
    { identifier: UserRepository, implementer: UserRepositoryHttpImpl },
    { identifier: ServicesRepository, implementer: ServicesRepositoryIdbImpl },

    // use cases
    { identifier: SetMasterKeyUseCase, implementer: SetMasterKeyUseCase },
    { identifier: AddServiceUseCase, implementer: AddServiceUseCase },
    { identifier: ListServicesUseCase, implementer: ListServicesUseCase },
    { identifier: RemoveServiceUseCase, implementer: RemoveServiceUseCase },
  ],
};
