import { IocContainerConfig } from '@/core/ioc/ioc-container';

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
import { IdbService } from '@/core/service/idb/idb.service';
import { IdbImplService } from '@/core/service/idb/idb-impl.service';

import { UserRepository } from '@/core/repository/user/user.repository';
import { UserRepositoryHttpImpl } from '@/core/repository/user/user-http.repository';
import { ServicesRepository } from '@/core/repository/services/services.repository';
import { ServicesRepositoryIdbImpl } from '@/core/repository/services/services-idb.repository';
import { ImageRepository } from '@/core/repository/image/image.repository';
import { ImageRepositoryInMemoryImpl } from '@/core/repository/image/image-in-memory.repository';

import { SetMasterKeyUseCase } from '@/core/use-case/keys/set-master-key.use-case';
import { GetMasterKeyUseCase } from '@/core/use-case/keys/get-master-key.use-case';
import { AddServiceUseCase } from '@/core/use-case/services/add-service.use-case';
import { RemoveServiceUseCase } from '@/core/use-case/services/remove-service.use-case';
import { ListServicesUseCase } from '@/core/use-case/services/list-services.use-case';
import { UpdateServiceUseCase } from '@/core/use-case/services/update-service.use-case';
import { ListImagesUseCase } from '@/core/use-case/images/list-images.use-case';
import { RemoveAllServicesUseCase } from '@/core/use-case/services/remove-all-services.use-case';
import { RemoveAllUseCase } from '@/core/use-case/services/remove-all.use-case';
import { ExportUseCase } from '@/core/use-case/import/export.use-case';
import { ImportUseCase } from '@/core/use-case/import/import.use-case';
import { GetThemeUseCase } from '@/core/use-case/theme/get-theme.use-case';
import { SetThemeUseCase } from '@/core/use-case/theme/set-theme.use-case';


export const IOC_CONTAINER_CONFIG_SHARED: IocContainerConfig = {
  units: [
    // services
    { identifier: NetworkService, implementer: NetworkServiceHttpImpl },
    { identifier: NotificationService, implementer: NotificationServiceMapImpl },
    { identifier: PersistenceService, implementer: PersistenceServiceLocalStorageImpl },
    { identifier: ErrorTrackerService, implementer: ErrorTrackerServiceProvidedImpl },
    { identifier: ConfigService, implementer: ConfigServiceEnvImpl },
    { identifier: StoreProviderService, implementer: VuexStoreProviderServiceImpl },
    { identifier: IdbService, implementer: IdbImplService },

    // data repositories
    { identifier: UserRepository, implementer: UserRepositoryHttpImpl },
    { identifier: ServicesRepository, implementer: ServicesRepositoryIdbImpl },
    { identifier: ImageRepository, implementer: ImageRepositoryInMemoryImpl },

    // use cases
    { identifier: SetMasterKeyUseCase, implementer: SetMasterKeyUseCase },
    { identifier: GetMasterKeyUseCase, implementer: GetMasterKeyUseCase },
    { identifier: AddServiceUseCase, implementer: AddServiceUseCase },
    { identifier: ListServicesUseCase, implementer: ListServicesUseCase },
    { identifier: RemoveServiceUseCase, implementer: RemoveServiceUseCase },
    { identifier: UpdateServiceUseCase, implementer: UpdateServiceUseCase },
    { identifier: ListImagesUseCase, implementer: ListImagesUseCase },
    { identifier: RemoveAllServicesUseCase, implementer: RemoveAllServicesUseCase },
    { identifier: RemoveAllUseCase, implementer: RemoveAllUseCase },
    { identifier: ImportUseCase, implementer: ImportUseCase },
    { identifier: ExportUseCase, implementer: ExportUseCase },
    { identifier: GetThemeUseCase, implementer: GetThemeUseCase },
    { identifier: SetThemeUseCase, implementer: SetThemeUseCase },
  ],
};
