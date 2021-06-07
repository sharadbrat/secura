import { IocContainerConfig } from '@/core/ioc/ioc-container';
import { IOC_CONTAINER_CONFIG_PROD } from '@/core/ioc/prod.config';
import { IOC_CONTAINER_CONFIG_DEV } from '@/core/ioc/dev.config';


/**
 * @function getIocConfig
 * @return {IocContainerConfig}
 */
export function getIocConfig(): IocContainerConfig {
  if (process.env.NODE_ENV === 'production') {
    return IOC_CONTAINER_CONFIG_PROD;
  }

  if (process.env.NODE_ENV === 'test') {
    // TODO: add mock implementation of services for testing
    return IOC_CONTAINER_CONFIG_DEV;
  }

  // return dev config as default
  return IOC_CONTAINER_CONFIG_DEV;
}
