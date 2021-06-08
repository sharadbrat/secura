<template>
  <div id="app">
    <UiIconsDefinition/>

    <NotificationPresenter/>

    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';
  import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
  import { ListServicesUseCase } from '@/core/use-case/services/list-services.use-case';
  import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';

  import UiIconsDefinition from '@/app/ui-kit/UiIconsDefinition.vue';
  import NotificationPresenter from '@/app/components/NotificationsPresenter.vue';


  @Component({
    components: {
      UiIconsDefinition,
      NotificationPresenter,
    },
  })
  export default class App extends Vue {

    @LazyInject(ErrorTrackerService)
    public errorTrackerService: ErrorTrackerService;

    @LazyInject(StoreProviderService)
    public store: StoreProviderService;

    @LazyInject(ListServicesUseCase)
    public listServicesUseCase: ListServicesUseCase;

    @LazyInject(PersistenceService)
    public persistenceService: PersistenceService;

    public created() {
      this.errorTrackerService.setupErrorTracking();
      this.loadPersistedMasterKey();
      this.printVersion();
      this.listServicesUseCase.perform();
    }

    public printVersion() {
      const styles = 'color: orange; background-color: black; display: inline-block; padding: 12px;';
      // eslint-disable-next-line no-console
      console.log(`%cVersion: ${process.env.VUE_APP_VERSION}`, styles);
    }

    public loadPersistedMasterKey() {
      const masterKey = this.persistenceService.loadValue(PersistenceServiceValueName.MASTER_KEY);
      if (masterKey) {
        this.store.commit('keys/setPersisted', true);
        this.store.commit('keys/setMasterKey', masterKey);
      }
    }

  }
</script>
