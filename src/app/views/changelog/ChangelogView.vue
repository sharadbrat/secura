<template>
  <SecondLevelLayout backUrl="/about" title="Changelog">

    <div class="changelog-view">

      <UiLogo tag="span"/>
      <span class="changelog-view__version">{{appVersion}}</span>

      <h2 class="changelog-view__heading">v0.4.3</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Small fixes to improve the UX on mobiles.</li>
      </ul>

      <h2 class="changelog-view__heading">v0.4.2</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Fixed the behavior of back button for navigation.</li>
        <li class="changelog-view__list-item">Fixed backgound blur on older browsers.</li>
        <li class="changelog-view__list-item">Several small fixes to improve the UX on mobiles.</li>
      </ul>

      <h2 class="changelog-view__heading">v0.4.1</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Added smooth transitions between pages.</li>
        <li class="changelog-view__list-item">Added smooth animation when changing color theme.</li>
      </ul>

      <h2 class="changelog-view__heading">v0.4.0</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Added "copy to clipboard" option in Export & Import menu.</li>
      </ul>

      <h2 class="changelog-view__heading">v0.3.0</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Added share feature for supported browsers.</li>
        <li class="changelog-view__list-item">Added changelog view.</li>
      </ul>

      <h2 class="changelog-view__heading">v0.2.0</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Added themes support: system default theme, dark theme, light theme.</li>
        <li class="changelog-view__list-item">Added offline support.</li>
      </ul>

      <h2 class="changelog-view__heading">v0.1.1</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Fixed non-critical bugs.</li>
        <li class="changelog-view__list-item">Added more  convenient keyboard controls.</li>
      </ul>

      <h2 class="changelog-view__heading">v0.1.0</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">First launch.</li>
      </ul>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiLogo,
    },
  })
  export default class ChangelogView extends Vue {

    public get appVersion(): string {
      return process.env.VUE_APP_VERSION;
    }

  }
</script>


<style scoped lang="scss">
  .changelog-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
      @include UiMargin(md, top);
    }

    &__list {
      @include UiMargin(xs, bottom);
    }

    &__list-item {
      list-style-type: disc;
      list-style-position: inside;
    }

    &__version {
      @include UiMargin(xxxs, top);
      @include UiMargin(sm, bottom);
      @include UiTypographyBodySmall();
      display: block;

      @include UiTheme() {
        color: UiColor(shade-650);
      }
    }

  }
</style>
