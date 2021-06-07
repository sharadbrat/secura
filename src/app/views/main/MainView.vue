<template>
  <TopLevelLayout>

    <div class="main-view">

      <MainViewBanner
        @button-click="OnTryNowClick"
      />

    </div>
  </TopLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import TopLevelLayout from '@/app/layouts/TopLevelLayout.vue';
  import MainViewBanner from '@/app/views/main/components/MainViewBanner.vue';


  @Component({
    components: {
      TopLevelLayout,
      MainViewBanner,
    },
  })
  export default class MainView extends Vue {

    public OnTryNowClick() {
      console.log('try');
    }

  }
</script>


<style scoped lang="scss">
  .main-view {

    @include UiPadding(md, bottom);

  }
</style>
