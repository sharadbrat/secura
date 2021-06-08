<template>
  <TopLevelLayout>

    <div class="main-view">

      <MainViewList v-if="masterKey"/>

      <MainViewBanner v-else/>

    </div>
  </TopLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { State } from 'vuex-class';

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

  }
</script>


<style scoped lang="scss">
  .main-view {

    @include UiPadding(lg, bottom);

  }
</style>
