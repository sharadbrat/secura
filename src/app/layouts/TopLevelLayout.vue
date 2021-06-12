<template>
  <div class="top-level-layout">

    <UiHeader :title="title" :items="navItems"/>

    <main class="top-level-layout__main">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import UiHeader, { NavigationItem } from '@/app/ui-kit/UiHeader.vue';


  @Component({
    components: {
      UiHeader,
    },
  })
  export default class TopLevelLayout extends Vue {

    @Prop() public title: string;

    @State(state => state.keys.masterKey)
    public masterKey: string;

    public get isNavDisplayed(): boolean {
      return Boolean(this.masterKey);
    }

    public get navItems(): NavigationItem[] {
      if (!this.isNavDisplayed) {
        return [];
      }

      return [
        {
          url: 'settings',
          title: 'Settings',
          icon: null,
        },
        {
          url: 'about',
          title: 'About',
          icon: null,
        },
      ];
    }

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
