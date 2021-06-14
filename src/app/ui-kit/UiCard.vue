<template>
  <div
    class="ui-card"
    :class="[
      shadowClass,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';


  /**
   * @class UiCard
   * @extends Vue
   * @public
   */
  @Component
  export default class UiCard extends Vue {

    private static readonly defaultShadowSize: number = 0;

    @Prop()
    public shadow?: number;

    public get shadowClass() {
      const shadow = this.shadow || UiCard.defaultShadowSize;
      return `ui-card_shadow-${shadow}`;
    }

  }
</script>
<style scoped lang="scss">
  .ui-card {
    @include UiBorderRadius(md);

    @include UiTheme() {
      background-color: UiColor(shade-200);
    }

    &_shadow-0 {
      box-shadow: UiShadow(0);
    }

    &_shadow-1 {
      box-shadow: UiShadow(1);
    }

    &_shadow-2 {
      box-shadow: UiShadow(2);
    }
  }
</style>
