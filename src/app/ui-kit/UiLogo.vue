<template>
  <figure
    aria-label="Secura"
    class="ui-logo"
  >
    <UiIcon class="ui-logo__icon" name="lock" size="lg"/>
    <h1 class="ui-logo__text">Secura</h1>
  </figure>
</template>


<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  export type UiLogoType = 'small' | 'big';


  @Component({
    components: {
      UiIcon,
    },
  })
  export default class UiLogo extends Vue {

  }
</script>


<style lang="scss" scoped>
  .ui-logo {

    display: flex;
    align-items: center;

    &__icon {
      @include UiBorderRadius(sm);
      @include UiPadding(xxxs);
      background-color: UiColor(main);
      color: UiColor(shade-100);
    }

    &__text {
      @include UiTypographyHeading1();

      @include UiMediaDesktop() {
        @include UiMargin(sm, left);
      }

      @include UiMediaMobileAndTablet() {
        @include UiMargin(sm, right);
      }
    }

    @include UiMediaMobileAndTablet() {
      flex-direction: row-reverse;
    }

  }
</style>
