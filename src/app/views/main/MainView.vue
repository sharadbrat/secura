<template>
  <TopLevelLayout>

    <div class="main-view">

      <MainViewList v-if="isListViewShown"/>

      <MainViewBanner v-else/>

    </div>
  </TopLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import { ServiceEntity } from '@/core/entity/service';

  import TopLevelLayout from '@/app/layouts/TopLevelLayout.vue';
  import MainViewBanner from '@/app/views/main/components/MainViewBanner.vue';
  import MainViewList from '@/app/views/main/components/MainViewList.vue';


  @Component({
    components: {
      TopLevelLayout,
      MainViewBanner,
      MainViewList,
    },
  })
  export default class MainView extends Vue {

    @State(state => state.keys.masterKey)
    public masterKey: string;

    @State(state => state.services.services)
    public services: ServiceEntity[];

    public get isListViewShown(): boolean {
      return Boolean(this.masterKey || this.services.length > 0);
    }

  }
</script>


<style scoped lang="scss">
  .main-view {

    @include UiPadding(lg, bottom);

  }
</style>
