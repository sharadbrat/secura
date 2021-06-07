<template>
  <div class="top-level-layout">

    <UiHeader :title="title"/>

    <main class="top-level-layout__main">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import UiHeader from '@/app/ui-kit/UiHeader.vue';


  @Component({
    components: {
      UiHeader,
    },
  })
  export default class TopLevelLayout extends Vue {

    @Prop() public title: string;

  }
</script>

<style scoped lang="scss">
  .top-level-layout {

    display: flex;
    flex-direction: column;
    height: 100%;

    &__main {
      @include UiMargin(lg, top);
      @include UiMargin(lg, bottom);
      @include UiLayout();

      flex-grow: 1;
    }

  }
</style>
