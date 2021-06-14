<template>
  <div class="ui-loader">
    <div class="ui-loader__element"></div>
    <div class="ui-loader__element"></div>
    <div class="ui-loader__element"></div>
    <div class="ui-loader__element"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';


  /**
   * @class UiLoader
   * @extends Vue
   * @public
   */
  @Component
  export default class UiLoader extends Vue { }
</script>

<style lang="scss" scoped>
  .ui-loader {
    display: inline-block;
    position: relative;
    width: 22 * $grid-step;
    height: 22 * $grid-step;

    &__element {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 16 * $grid-step;
      height: 16 * $grid-step;
      margin: map_get($grid-spacing, xs);
      border: map_get($grid-spacing, xs) solid;
      border-radius: 50%;
      animation: ui-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      @include UiTheme() {
        border-color: UiColor(main) transparent transparent transparent;
      }

      &:nth-child(1) {
        animation-delay: 0.45s;
      }

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.15s;
      }
    }


    @keyframes ui-loader {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
