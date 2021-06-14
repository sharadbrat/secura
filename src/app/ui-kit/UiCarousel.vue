<template>
  <div class="ui-carousel">
    <button
      class="ui-carousel__control ui-carousel__control_left"
      v-if="canGoLeft"
      @click="$emit('go-left')"
    >
      <UiIcon name="arrow-left"/>
    </button>

    <div class="ui-carousel__container">
      <slot></slot>
    </div>

    <button
      class="ui-carousel__control ui-carousel__control_right"
      v-if="canGoRight"
      @click="$emit('go-right')"
    >
      <UiIcon name="arrow-right"/>
    </button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  /**
   * @class UiCarousel
   * @extends Vue
   * @public
   */
  @Component({
    components: { UiIcon },
  })
  export default class UiCarousel extends Vue {

    @Prop() public canGoRight: boolean;

    @Prop() public canGoLeft: boolean;

  }
</script>

<style scoped lang="scss">
  .ui-carousel {
    position: relative;

    display: block;
    height: fit-content;
    width: 100%;

    &__container {
      display: flex;
      align-items: stretch;
      width: 100%;
      justify-content: space-between;

      > * {
        flex-shrink: 1;
        flex-grow: 1;
        // a hack that eventually works :)
        flex-basis: 100px;
        overflow: hidden;

        &:not(:last-child) {
          @include UiMargin(md, right);
        }
      }
    }

    &__control {
      $size: $grid-step * 10;
      @include UiButtonAppearance();
      @include UiButtonStates(false);

      display: flex;
      justify-content: center;
      align-items: center;
      width: $size;
      height: $size;
      padding: 0;

      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);;
      border-radius: 50%;
      z-index: 1;

      @include UiTheme() {
        $backbround-color-base: UiColor(shade-900);
        background-color: rgba($backbround-color-base, 0.4);
        color: UiColor(shade-100);
      }

      &::after {
        border-radius: 50%;
      }

      &_left {
        left: - ($size / 2);
      }

      &_right {
        right: - ($size / 2);
      }
    }
  }
</style>
