import '@/polyfills';

import Vue from 'vue';

import App from '@/app/App.vue';
import { ApplicationRouter } from '@/app/router';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { container } from '@/core/ioc';

// include global styles
import './styles/main.scss';

// include service worker
import './registerServiceWorker';


(function initApp() {
  Vue.config.productionTip = false;
  const storeProviderService = container.get(StoreProviderService);

  new Vue({
    router: new ApplicationRouter().getRouter(),
    store: storeProviderService.getStore(),
    render: h => h(App),
  }).$mount('#app');
}());
