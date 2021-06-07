import { getIocConfig } from '@/core/ioc/get-ioc-config';
import { initIocContainer } from '@/core/ioc/ioc-container';

// ioc container config for specific environment
const config = getIocConfig();

// LazyInject function is used in classes that are not spawned by ioc container
const { container, decorators } = initIocContainer(config);
const { LazyInject } = decorators;


export { container, LazyInject };
