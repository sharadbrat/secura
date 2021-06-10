<template>
  <SecondLevelLayout backUrl="/" title="About">

    <div class="about-view">

      <h2 class="about-view__heading">Secura - headless password manager</h2>

      <p class="about-view__paragraph">
        Installable web app that stores your services and derives passwords for
        them from their names. It does not use a server to store and access
        data, everything happens on your device!
      </p>

      <h3 class="about-view__subheading">How it works</h3>

      <p class="about-view__paragraph">
        TBD
      </p>

      <h3 class="about-view__subheading">Why</h3>

      <p class="about-view__paragraph">
        TBD
      </p>

      <h2 class="about-view__heading">Author</h2>

      <p class="about-view__paragraph">
        TBD
      </p>

      <h3 class="about-view__subheading">Contact me</h3>

      <p class="about-view__paragraph">
        TBD
      </p>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';


  @Component({
    components: {
      SecondLevelLayout,
    },
  })
  export default class AboutView extends Vue {
  }
</script>


<style scoped lang="scss">
  .about-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
    }

    &__subheading {
      @include UiTypographyHeading4();
      @include UiMargin(sm, bottom);
      @include UiMargin(sm, top);
    }

    &__paragraph {
      @include UiMargin(xs, bottom);
    }

  }
</style>
