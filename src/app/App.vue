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

  import UiIconsDefinition from '@/app/ui-kit/UiIconsDefinition.vue';
  import NotificationPresenter from '@/app/components/NotificationsPresenter.vue';
  import { ErrorTrackerService } from '@/core/service/error-tracker/error-tracker.service';
  import { LazyInject } from '@/core/ioc';


  @Component({
    components: {
      UiIconsDefinition,
      NotificationPresenter,
    },
  })
  export default class App extends Vue {

    @LazyInject(ErrorTrackerService)
    public errorTrackerService: ErrorTrackerService;

    public created() {
      this.errorTrackerService.setupErrorTracking();
      this.printVersion();
    }

    public printVersion() {
      const styles = 'color: orange; background-color: black; display: inline-block; padding: 12px;';
      // eslint-disable-next-line no-console
      console.log(`%cVersion: ${process.env.VUE_APP_VERSION}`, styles);
    }

  }
</script>
