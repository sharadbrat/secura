<template>
  <label class="ui-checkbox-container">
    <div
      class="ui-checkbox"
      :class="{
        'ui-checkbox_is-disabled': isDisabled,
        'ui-checkbox_is-checked': valueSync,
      }"
    >
      <input
        class="ui-checkbox__input"
        type="checkbox"
        :checked="valueSync"
        :disabled="isDisabled"
        @input="onInput($event.target.checked)"
      />
      <UiIcon name="done" class="ui-checkbox__check-mark" />
    </div>

    <span v-if="this.$slots.default" class="ui-checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component, Prop, Emit, PropSync,
  } from 'vue-property-decorator';

  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  /**
   * @class UiCheckbox
   * @extends Vue
   * @public
   */
  @Component({
    components: {
      UiIcon,
    },
  })
  export default class UiCheckbox extends Vue {

    @PropSync('value') public valueSync: boolean;

    @Prop() public isDisabled: boolean;

    @Emit('input')
    public onInput(value: boolean): boolean {
      return value;
    }

  }
</script>

<style scoped lang="scss">
  .ui-checkbox-container {
    display: flex;
    align-items: center;
    width: fit-content;
  }

  .ui-checkbox-label {
    display: block;
    @include UiMargin(sm, left);
  }

  .ui-checkbox {
    @include UiButtonAppearance();
    @include UiButtonStates(true);

    $size: $grid-step * 8;
    $transition-speed: 75ms;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $size;
    height: $size;
    flex-shrink: 0;

    border: 2px solid UiColor(main-light);
    border-radius: $grid-step;
    cursor: pointer;
    background-color: UiColor(shade-100);

    transition: border-color ease-out $transition-speed;
    will-change: border-color;

    &_is-checked {
      border-color: UiColor(main);
    }

    &_is-disabled {
      border-color: UiColor(shade-600);
      cursor: auto;
      pointer-events: none;

      .ui-checkbox__check-mark {
        color: UiColor(shade-600);
      }
    }

    &__input {
      position: absolute;
      z-index: -1;
      width: $size;
      height: $size;
      appearance: none;
    }

    &__check-mark {
      color: UiColor(main);

      opacity: 0;
      visibility: hidden;
      transform: rotateZ(10deg) scale(0.8);

      transition-duration: $transition-speed;
      transition-timing-function: ease-out;
      transition-property: opacity, visibility, transform;
      will-change: opacity, visibility, transform;
    }

    &__input:checked ~ &__check-mark {
      opacity: 1;
      visibility: visible;
      transform: rotateZ(0deg) scale(1);
    }
  }
</style>
