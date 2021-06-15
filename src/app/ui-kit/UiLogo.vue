<template>
  <figure
    aria-label="Secura"
    class="ui-logo"
  >
    <UiIcon class="ui-logo__icon" name="lock" size="lg"/>
    <component :is="tag" class="ui-logo__text">Secura</component>
  </figure>
</template>


<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  export type UiLogoType = 'small' | 'big';


  @Component({
    components: {
      UiIcon,
    },
  })
  export default class UiLogo extends Vue {

    @Prop({ default: 'h1' })
    public tag: string;

  }
</script>


<style lang="scss" scoped>
  .ui-logo {

    display: flex;
    align-items: center;

    &__icon {
      @include UiBorderRadius(sm);
      @include UiPadding(xxxs);

      @include UiTheme() {
        background-color: UiColor(main);
      }
      color: UiColor(shade-100);
    }

    &__text {
      @include UiTypographyHeading1();
      @include UiMargin(sm, left);
    }

  }
</style>
