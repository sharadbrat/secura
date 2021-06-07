<template>
  <div class="ui-switch-button">
    <UiButton
      class="ui-switch-button__item"
      :key="option[label]"
      v-for="option in options"
      width="shrink"
      :size="size"
      :shape="shape"
      :type="value && value[label] === option[label] ? 'primary' : 'secondary'"
      @click="onOptionClick(option)"
    >
      <span>
        {{option[label]}}
      </span>
    </UiButton>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import UiButton, { UiButtonSize, UiButtonShape } from '@/app/ui-kit/UiButton.vue';


  /**
   * @class UiSwitchButton
   * @extends Vue
   * @public
   */
  @Component({
    components: { UiButton },
  })
  export default class UiSwitchButton<T> extends Vue {

    @Prop({ type: String }) public size?: UiButtonSize;

    @Prop({ type: String }) public shape?: UiButtonShape;

    @Prop({ default: 'label' }) public label?: string;

    @Prop({ default: () => [] }) public options: T[];

    @Prop() public value!: T;

    private onOptionClick(option: T) {
      this.$emit('input', option);
    }

  }
</script>

<style scoped lang="scss">
  .ui-switch-button {
    display: flex;
    align-items: stretch;
    width: 100%;

    &__item {
      flex-grow: 1;
      flex-basis: 0;
      &:not(:last-child) {
        &, &::after {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      &:not(:first-child) {
        &, &::after {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: none;
        }
      }
    }
  }
</style>
