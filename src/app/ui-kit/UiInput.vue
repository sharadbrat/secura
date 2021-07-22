<template>
  <input
    ref="input-element"
    class="ui-input"
    :class="[{
      'ui-input_is-block': isBlock,
      'ui-input_is-required': required,
    }, sizeClass]"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :pattern="pattern"
    :required="required"
    :readonly="readonly"
    :autofocus="autofocus"
    @input="$emit('input', $event.target.value)"
    @keydown="$emit('keydown', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop, Ref } from 'vue-property-decorator';

  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  export type UiInputSize = 'md' | 'sm' | 'xs';


  /**
   * @class UiInput
   * @extends Vue
   * @public
   */
  @Component({
    components: { UiIcon },
  })
  export default class UiInput extends Vue {

    private static readonly defaultInputSize = 'md';

    @Ref('input-element')
    public inputElement!: HTMLInputElement;

    @Prop() public value!: string;

    @Prop() public isBlock?: boolean;

    @Prop() public type?: string;

    @Prop() public placeholder?: string;

    @Prop() public min?: number;

    @Prop() public max?: number;

    @Prop() public pattern?: string;

    @Prop() public required?: boolean;

    @Prop() public readonly?: boolean;

    @Prop() public autofocus?: boolean;

    @Prop() public size?: boolean;

    private get sizeClass(): string {
      const size = this.size || UiInput.defaultInputSize;
      return `ui-input_size-${size}`;
    }

  }
</script>

<style scoped lang="scss">
  .ui-input {
    @include UiInputAppearance();
    width: $grid-step * 72; // 288px
    position: relative;

    &_is-block {
      width: 100%;
      display: block;
    }


    &_is-required {
      &::before {
        @include UiTypographyBodyMid();

        content: '*';

        position: absolute;
        left: map_get($grid-spacing, xs);
        top: 50%;
        transform: translateY(-50%);

        display: block;
        width: fit-content;
        height: $grid-step * 3;
        line-height: 1;

        color: UiColor(negative);

        @include UiMediaMobile() {
          left: map_get($grid-spacing, xxs);
        }
      }
    }


    &_size-md {
      $height: $grid-step * 12;
      height: $height;
    }


    &_size-sm {
      $height: $grid-step * 9;
      height: $height;
    }


    &_size-xs {
      $height: $grid-step * 6;
      height: $height;
    }

  }
</style>
