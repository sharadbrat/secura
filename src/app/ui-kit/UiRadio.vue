<template>
  <label class="ui-radio-container" @click="onClick()">
    <input
      class="ui-radio"
      type="radio"
      :value="value"
      :checked="isChecked"
      :disabled="isDisabled"
      :name="name"
    />

    <span v-if="this.$slots.default" class="ui-radio-label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component, Prop, Emit, Model,
  } from 'vue-property-decorator';

  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  /**
   * @class UiRadio
   * @extends Vue
   * @public
   */
  @Component({
    components: {
      UiIcon,
    },
  })
  export default class UiCheckbox<T> extends Vue {

    @Prop() public isDisabled: boolean;

    @Prop() public name: string;

    @Prop() public value: T;

    @Model('change') public model: T;

    public get isChecked() {
      return this.model === this.value;
    }

    public get internalModel() {
      return this.value;
    }

    public set internalModel(value: T) {
      this.onChange(value);
    }

    public onClick() {
      if (!this.isDisabled) {
        this.onChange(this.value);
      }
    }

    @Emit('change')
    public onChange(value: T): T {
      return value;
    }

  }
</script>

<style scoped lang="scss">
  .ui-radio-container {
    display: flex;
    align-items: center;
    width: fit-content;
    cursor: pointer;
  }

  .ui-radio-label {
    display: block;
    @include UiMargin(xs, left);
  }

  .ui-radio {
    @include UiButtonAppearance();
    @include UiButtonStates(true);

    $size: $grid-step * 5;
    $transition-speed: 75ms;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $size;
    height: $size;
    flex-shrink: 0;

    border: 1px solid UiColor(main);
    border-radius: $size / 2;
    background-color: UiColor(shade-100);
    appearance: none;

    &::before {
      content: "";
      position: absolute;
      width: calc(100% - #{$grid-step * 1.5});
      height: calc(100% - #{$grid-step * 1.5});
      border-radius: 50%;

      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);

      pointer-events: none;
      background-color: UiColor(main);

      transition-duration: $transition-speed;
      transition-property: transform opacity visibility;
      transition-timing-function: UiTransition() linear linear;

      will-change: opacity visibility transform;
    }

    &:checked {
      border-color: UiColor(main);
      &::before {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
    }

    &:disabled {
      border-color: UiColor(shade-600);
      cursor: auto;
      pointer-events: none;

      &::before {
        color: UiColor(shade-600);
      }
    }

  }
</style>
