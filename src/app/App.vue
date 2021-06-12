<template>
  <div id="app">
    <UiIconsDefinition/>

    <NotificationPresenter/>

    <UiLoader class="app__loader" v-if="isLoading"/>

    <router-view v-else/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';
  import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
  import { ListServicesUseCase } from '@/core/use-case/services/list-services.use-case';
  import { ListImagesUseCase } from '@/core/use-case/images/list-images.use-case';
  import { PersistenceService, PersistenceServiceValueName } from '@/core/service/persistence/persistence.service';

  import UiIconsDefinition from '@/app/ui-kit/UiIconsDefinition.vue';
  import UiLoader from '@/app/ui-kit/UiLoader.vue';
  import NotificationPresenter from '@/app/components/NotificationsPresenter.vue';


  @Component({
    components: {
      UiIconsDefinition,
      UiLoader,
      NotificationPresenter,
    },
  })
  export default class App extends Vue {

    public isLoading: boolean = true;

    @LazyInject(ErrorTrackerService)
    public errorTrackerService: ErrorTrackerService;

    @LazyInject(StoreProviderService)
    public store: StoreProviderService;

    @LazyInject(ListServicesUseCase)
    public listServicesUseCase: ListServicesUseCase;

    @LazyInject(ListImagesUseCase)
    public listImagesUseCase: ListImagesUseCase;

    @LazyInject(PersistenceService)
    public persistenceService: PersistenceService;

    public created() {
      this.errorTrackerService.setupErrorTracking();
      this.printVersion();

      this.loadData();
    }

    private async loadData() {
      this.loadPersistedMasterKey();
      await this.listImagesUseCase.perform();
      await this.listServicesUseCase.perform();
      this.isLoading = false;
    }

    private printVersion() {
      const styles = 'color: orange; background-color: black; display: inline-block; padding: 12px;';
      // eslint-disable-next-line no-console
      console.log(`%cVersion: ${process.env.VUE_APP_VERSION}`, styles);
    }

    private loadPersistedMasterKey() {
      const masterKey = this.persistenceService.loadValue(PersistenceServiceValueName.MASTER_KEY);
      if (masterKey) {
        this.store.commit('keys/setPersisted', true);
        this.store.commit('keys/setMasterKey', masterKey);
      }
    }

  }
</script>


<style scoped lang="scss">
  .app {

    &__loader {
      @include UiMargin(xl, top);
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

  }
</style>
