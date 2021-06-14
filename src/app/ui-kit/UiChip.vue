<template>
  <component
    :is="isClickable ? 'button' : 'span'"
    class="ui-chip"
    :class="[
      typeClass,
      stateClass,
      sizeClass,
    ]"
    @click="onClick()"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Emit, Prop } from 'vue-property-decorator';


  type UiChipSize = 'md' | 'sm';


  @Component
  export default class UiChip extends Vue {

    private static readonly defaultSize: UiChipSize = 'md';

    @Prop({ default: false }) public isClickable?: boolean;

    @Prop({ default: 'md' }) public size?: UiChipSize;

    @Prop() public value: boolean;

    public get typeClass(): string {
      return this.isClickable ? 'ui-chip_is-clickable' : '';
    }

    public get stateClass(): string {
      return !this.value ? 'ui-chip_is-inactive' : '';
    }

    public get sizeClass(): string {
      const size = this.size || UiChip.defaultSize;
      return `ui-chip_size-${size}`;
    }

    @Emit('input')
    public onClick(): boolean {
      return !this.value;
    }

  }
</script>

<style lang="scss" scoped>
  .ui-chip {

    display: inline-flex;

    height: fit-content;
    border-radius: 9 * $grid-step;

    @include UiTheme() {
      background-color: UiColor(shade-100);
      border: 2px solid UiColor(main);
    }

    &_size-md {
      @include UiPadding(sm);
      @include UiPadding(xs, top);
      @include UiPadding(xs, bottom);
    }

    &_size-sm {
      @include UiPadding(xxs);
      @include UiPadding(xxxs, top);
      @include UiPadding(xxxs, bottom);
      @include UiTypographyBodySmall();
    }

    &_is-clickable {
      @include UiButtonStates(true);
      @include UiButtonAppearance();
      cursor: pointer;
      @include UiTheme() {
        border-color: UiColor(main);
      }
    }

    &_is-inactive {
      @include UiTheme() {
        color: UiColor(shade-600);
        border: 1px solid UiColor(main-weak);
      }
    }

  }
</style>
