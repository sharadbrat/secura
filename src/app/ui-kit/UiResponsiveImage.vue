<template>
  <div class="ui-responsive-image">
    <div
      class="ui-responsive-image__fake"
      :style="[fakeInlineStyle]"
      :class="[backgroundModeClass]"
    />
    <img class="ui-responsive-image__img" :src="src" :alt="alt"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';


  type UiResponsiveImageBackgroundMode = 'contain' | 'cover';


  /**
   * @class UiFooter
   * @extends Vue
   * @public
   */
  @Component
  export default class UiResponsiveImage extends Vue {

    private static readonly imageFallback = "data:image/svg+xml,%3Csvg viewBox='0 0 684 684' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='684' height='684' fill='%23EDEDED'/%3E%3Cpath d='M573 164H109C104.757 164 100.687 165.686 97.6863 168.686C94.6857 171.687 93 175.757 93 180V500C93 504.243 94.6857 508.313 97.6863 511.314C100.687 514.314 104.757 516 109 516H573C577.243 516 581.313 514.314 584.314 511.314C587.314 508.313 589 504.243 589 500V180C589 175.757 587.314 171.687 584.314 168.686C581.313 165.686 577.243 164 573 164ZM573 180V448.696L402.656 278.344C401.156 276.844 399.121 276.002 397 276.002C394.879 276.002 392.844 276.844 391.344 278.344L317 352.688L274.656 310.344C273.156 308.844 271.121 308.002 269 308.002C266.879 308.002 264.844 308.844 263.344 310.344L109 464.688V180H573ZM109 500V487.312L269 327.312L359.344 417.656C360.853 419.113 362.874 419.92 364.971 419.901C367.069 419.883 369.075 419.042 370.559 417.559C372.042 416.075 372.883 414.069 372.901 411.971C372.92 409.874 372.113 407.853 370.656 406.344L328.312 364L397 295.312L573 471.312V500H109Z' fill='%23C8C8C8'/%3E%3C/svg%3E";

    private static readonly defaultBackgroundMode = 'contain';

    @Prop() public src?: string;

    @Prop() public alt?: string;

    @Prop() public mode?: UiResponsiveImageBackgroundMode;

    get fakeInlineStyle() {
      const backgroundImage = `url("${this.src || UiResponsiveImage.imageFallback}")`;
      return { 'background-image': backgroundImage };
    }

    get backgroundModeClass() {
      const mode = this.mode || UiResponsiveImage.defaultBackgroundMode;
      return `ui-responsive-image__fake_mode-${mode}`;
    }

  }
</script>

<style lang="scss" scoped>
  .ui-responsive-image {
    position: relative;

    width: 100%;
    height: $grid-step * 60;

    overflow: hidden;

    &__img {
      position: absolute;
      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      opacity: 0.00000001;
    }

    &__fake {
      position: absolute;
      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      background-position: center;
      background-repeat: no-repeat;

      &_mode-contain {
        background-size: contain;
      }


      &_mode-cover {
        background-size: cover;
      }

    }

  }
</style>
