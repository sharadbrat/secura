<template>
  <div
    id="app"
    :class="{
      'app_theme-light': theme === themes.LIGHT,
      'app_theme-dark': theme === themes.DARK,
      'app_theme-default': theme === themes.DEFAULT,
    }"
  >
    <UiIconsDefinition/>

    <NotificationPresenter/>

    <UiLoader class="app__loader" v-if="isLoading"/>

    <router-view v-else/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import { LazyInject } from '@/core/ioc';
  import { Theme } from '@/core/entity/theme';
  import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';
  import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
  import { ListServicesUseCase } from '@/core/use-case/services/list-services.use-case';
  import { ListImagesUseCase } from '@/core/use-case/images/list-images.use-case';
  import { GetMasterKeyUseCase } from '@/core/use-case/keys/get-master-key.use-case';
  import { GetThemeUseCase } from '@/core/use-case/theme/get-theme.use-case';

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

    @LazyInject(GetMasterKeyUseCase)
    public getMasterKeyUseCase: GetMasterKeyUseCase;

    @LazyInject(GetThemeUseCase)
    public getThemeUseCase: GetThemeUseCase;

    @State(state => state.themes.theme)
    public theme: Theme;

    public themes = Theme;

    public created() {
      this.errorTrackerService.setupErrorTracking();
      this.printVersion();

      this.loadData();
    }

    private async loadData() {
      await this.getThemeUseCase.perform();
      await this.getMasterKeyUseCase.perform();
      await this.listImagesUseCase.perform();
      await this.listServicesUseCase.perform();
      this.isLoading = false;
    }

    private printVersion() {
      const styles = 'color: orange; background-color: black; display: inline-block; padding: 12px;';
      // eslint-disable-next-line no-console
      console.log(`%cVersion: ${process.env.VUE_APP_VERSION}`, styles);
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
