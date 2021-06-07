<template>
  <TopLevelLayout>

    <div class="main-view">

      Main view is here!

    </div>
  </TopLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import TopLevelLayout from '@/app/layouts/TopLevelLayout.vue';


  @Component({
    components: {
      TopLevelLayout,
    },
  })
  export default class MainView extends Vue {
  }
</script>


<style scoped lang="scss">
  .main-view {
  }
</style>
