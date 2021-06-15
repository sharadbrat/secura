<template>
  <span
    class="ui-icon"
    :class="[iconSizeClass]"
  >
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" :aria-label="name">
      <use :xlink:href="iconId"></use>
    </svg>
  </span>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  type IconSize = 'sm' | 'md' | 'lg';

  /**
   * @class UiIcon
   * @extends Vue
   * @public
   */
  @Component
  export default class UiIcon extends Vue {

    private static readonly defaultSize = 'md';

    @Prop() public name: string;

    @Prop() public size: IconSize;

    public get iconSizeClass() {
      const size = this.size || UiIcon.defaultSize;
      return `ui-icon_size-${size}`;
    }

    public get iconId() {
      return `#icon-${this.name}`;
    }

  }
</script>

<style scoped lang="scss">
  .ui-icon {
    display: inline-block;
    flex-shrink: 0;

    &_size-sm {
      $size: $grid-step * 4;
      width: $size;
      height: $size;
    }

    &_size-md {
      $size: $grid-step * 6;
      width: $size;
      height: $size;
    }

    &_size-lg {
      $size: $grid-step * 8;
      width: $size;
      height: $size;
    }
  }
</style>
