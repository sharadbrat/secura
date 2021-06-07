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

import { UserRepository } from '@/core/repository/user/user.repository';
import { UserRepositoryHttpImpl } from '@/core/repository/user/user-http.repository';

import { AuthenticatedRouteGuard } from '@/core/service/guard/authenticated-route.guard';
import { UnauthenticatedRouteGuard } from '@/core/service/guard/unauthenticated-route.guard';

import { RegisterUseCase } from '@/core/use-case/user/register.use-case';
import { LoginUseCase } from '@/core/use-case/user/login.use-case';
import { ForgotPasswordUseCase } from '@/core/use-case/user/forgot-password.use-case';
import { OauthUseCase } from '@/core/use-case/user/oauth.use-case';
import { MeUseCase } from '@/core/use-case/user/me.use-case';


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

    // data repositories
    { identifier: UserRepository, implementer: UserRepositoryHttpImpl },

    // guards
    { identifier: AuthenticatedRouteGuard, implementer: AuthenticatedRouteGuard },
    { identifier: UnauthenticatedRouteGuard, implementer: UnauthenticatedRouteGuard },

    // use cases
    { identifier: MeUseCase, implementer: MeUseCase },
    { identifier: LoginUseCase, implementer: LoginUseCase },
    { identifier: RegisterUseCase, implementer: RegisterUseCase },
    { identifier: ForgotPasswordUseCase, implementer: ForgotPasswordUseCase },
    { identifier: OauthUseCase, implementer: OauthUseCase },
  ],
};
