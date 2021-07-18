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

    <div v-else>
      <transition :name="routeTransitionName">
        <router-view/>
      </transition>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Watch } from 'vue-property-decorator';
  import { State } from 'vuex-class';
  import { Route } from 'vue-router';

  import { LazyInject } from '@/core/ioc';
  import { Theme } from '@/core/entity/theme';
  import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';
  import { ListServicesUseCase } from '@/core/use-case/services/list-services.use-case';
  import { ListImagesUseCase } from '@/core/use-case/images/list-images.use-case';
  import { GetMasterKeyUseCase } from '@/core/use-case/keys/get-master-key.use-case';
  import { GetThemeUseCase } from '@/core/use-case/theme/get-theme.use-case';

  import UiIconsDefinition from '@/app/ui-kit/UiIconsDefinition.vue';
  import UiLoader from '@/app/ui-kit/UiLoader.vue';
  import NotificationPresenter from '@/app/components/NotificationsPresenter.vue';


  enum RouteTransitionName {
    SLIDE_IN = 'app__route_slide-in',
    SLIDE_OUT = 'app__route_slide-out',
  }


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

    public routeTransitionName: RouteTransitionName = RouteTransitionName.SLIDE_IN;

    @Watch('$route')
    private onRouteChange(to: Route, from: Route) {
      if (!from || !to) {
        return;
      }

      const routesDepths = {
        main: 1,
        settings: 2,
        about: 2,
        changelog: 3,
      };

      const toDepth = routesDepths[to.name];
      const fromDepth = routesDepths[from.name];
      this.routeTransitionName = toDepth < fromDepth ? RouteTransitionName.SLIDE_OUT : RouteTransitionName.SLIDE_IN;
    }

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

    @mixin RouteTransition($translateX) {
      &-enter, &-leave-to {
        opacity: 0;
        transform: translateX($translateX);
      }
      &-enter-active, &-leave-active {
        transition: transform ease-out 200ms, opacity linear 100ms;
      }
      &-enter-to, &-leave {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &__loader {
      @include UiMargin(xl, top);
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    &__route {
      $translateX: 15%;
      &_slide-in {
        @include RouteTransition($translateX);
      }
      &_slide-out {
        @include RouteTransition(-$translateX);
      }
    }

  }
</style>
