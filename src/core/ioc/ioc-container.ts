import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';


export type InjectableUnit = {
  identifier: any;
  implementer: any;
}


export interface IocContainerConfig {
  units: InjectableUnit[];
}


export function initIocContainer(config: IocContainerConfig) {
  const container = new Container();
  const { lazyInject } = getDecorators(container);

  (config.units || []).forEach((unit: InjectableUnit) => {
    container.bind(unit.identifier).to(unit.implementer).inSingletonScope();
  });

  return { container, decorators: { LazyInject: lazyInject } };
}
