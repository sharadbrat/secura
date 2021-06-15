<template>
  <button
    class="ui-button"
    :class="[
      widthClass,
      typeClass,
      sizeClass,
      shapeClass,
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  export type UiButtonType = 'primary' | 'secondary' | 'link' | 'subdued' | 'transparent';

  export type UiButtonSize = 'md' | 'sm' | 'xs';

  export type UiButtonShape = 'circled' | 'rounded' | 'sharp';

  export type UiButtonWidth = 'block' | 'fit' | 'shrink';


  /**
   * @class UiButton
   * @extends Vue
   * @public
   */
  @Component
  export default class UiButton extends Vue {

    private static readonly defaultButtonType = 'primary';

    private static readonly defaultButtonSize = 'md';

    private static readonly defaultButtonShape = 'rounded';

    private static readonly defaultButtonWidth = 'fit';

    @Prop() width?: UiButtonWidth;

    @Prop() type?: UiButtonType;

    @Prop() size?: UiButtonSize;

    @Prop() shape?: UiButtonShape;

    get typeClass() {
      const type = this.type || UiButton.defaultButtonType;
      return `ui-button_type-${type}`;
    }

    get sizeClass() {
      const size = this.size || UiButton.defaultButtonSize;
      return `ui-button_size-${size}`;
    }

    get shapeClass() {
      const shape = this.shape || UiButton.defaultButtonShape;
      return `ui-button_shape-${shape}`;
    }

    get widthClass() {
      const width = this.width || UiButton.defaultButtonWidth;
      return `ui-button_width-${width}`;
    }

  }
</script>

<style scoped lang="scss">
  .ui-button {
    @include UiTypographyBody1();
    @include UiButtonAppearance();
    @include UiPadding(md, left);
    @include UiPadding(md, right);

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;


    // SIZES

    &_size-md {
      $size: $grid-step * 12; // 48px
      height: $size;
      min-width: $size;
    }

    &_size-sm {
      $size: $grid-step * 9; // 36px
      height: $size;
      min-width: $size;
    }

    &_size-xs {
      $size: $grid-step * 6; // 24px
      height: $size;
      min-width: $size;
    }


    // TYPES

    &_type-primary {
      @include UiButtonStates(false);

      color: UiColor(shade-100);

      @include UiTheme() {
        background-color: UiColor(main);
      }

      &:disabled {
        @include UiTheme() {
          background-color: UiColor(shade-500);
        }
      }
    }

    &_type-secondary {
      @include UiButtonStates(true);

      @include UiTheme() {
        background-color: UiColor(shade-100);
        color: UiColor(main);
        border-color: UiColor(main);
      }

      &:disabled {
        @include UiTheme() {
          color: UiColor(shade-600);
          border-color: UiColor(shade-600);
        }
      }
    }

    &_type-link {
      @include UiTypographyLink();

      padding: 0;
      height: fit-content;
      background-color: transparent;

      &::after {
        display: none;
      }

      &:hover, &:focus {
        text-decoration: underline;
      }

      &:disabled {
        text-decoration: none;

        @include UiTheme() {
          color: UiColor(shade-600);
        }
      }
    }

    &_type-subdued {
      @include UiButtonStates(true);

      font-weight: map_get($font-weight, semibold);

        @include UiTheme() {
          color: UiColor(shade-600);
        }
     }

    &_type-transparent {
      @include UiButtonStates(true);
     }

    // SHAPES

    &_shape-circled {
      // border-radius: 50% makes ellips form-factor, which we don't want
      border-radius: $grid-step * 10;

      &::after {
        border-radius: $grid-step * 10;
      }
    }

    &_shape-rounded {
      @include UiBorderRadius('sm');

      &::after {
        @include UiBorderRadius('sm');
      }
    }

    &_shape-sharp {
      border-radius: 0;

      &::after {
        border-radius: 0;
      }
    }

    // WIDTHS

    &_width-block {
      width: 100%;
    }

    &_width-fit {
      width: fit-content;
    }

    &_width-shrink {
      width: fit-content;
      padding: 0;
    }

  }
</style>
