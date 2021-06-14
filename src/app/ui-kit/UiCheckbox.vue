<template>
  <label class="ui-checkbox-container">
    <div
      class="ui-checkbox"
      :class="[
        {
          'ui-checkbox_is-disabled': isDisabled,
          'ui-checkbox_is-checked': valueSync,
        },
        sizeClass,
      ]"
    >
      <input
        class="ui-checkbox__input"
        type="checkbox"
        :checked="valueSync"
        :disabled="isDisabled"
        @input="onInput($event.target.checked)"
      />
      <UiIcon
        name="done"
        class="ui-checkbox__check-mark"
        :size="size || defaultCheckboxSize"
      />
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


  export type UiCheckboxSize = 'md' | 'sm';


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

    private static readonly defaultCheckboxSize = 'md';

    @PropSync('value') public valueSync: boolean;

    @Prop() public size?: UiCheckboxSize;

    @Prop() public isDisabled: boolean;


    get sizeClass() {
      const size = this.size || UiCheckbox.defaultCheckboxSize;
      return `ui-checkbox_size-${size}`;
    }

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

    $transition-speed: 75ms;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    border-radius: $grid-step;
    cursor: pointer;

    transition: border-color ease-out $transition-speed;
    will-change: border-color;

    @include UiTheme() {
      border: 2px solid UiColor(main-light);
      background-color: UiColor(shade-100);
    }

    &_is-checked {
      @include UiTheme() {
        border-color: UiColor(main);
      }
    }

    &_is-disabled {
      cursor: auto;
      pointer-events: none;

      @include UiTheme() {
        border-color: UiColor(shade-600);
      }

      .ui-checkbox__check-mark {
        @include UiTheme() {
          color: UiColor(shade-600);
        }
      }
    }

    &_size-md {
      $size: $grid-step * 8;
      width: $size;
      height: $size;

      .ui-checkbox__input {
        width: $size;
        height: $size;
      }
    }

    &_size-sm {
      $size: $grid-step * 6;
      width: $size;
      height: $size;

      .ui-checkbox__input {
        width: $size;
        height: $size;
      }
    }

    &__input {
      position: absolute;
      z-index: -1;
      appearance: none;
    }

    &__check-mark {
      @include UiTheme() {
        color: UiColor(main);
      }

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
