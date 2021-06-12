<template>
  <SecondLevelLayout backUrl="/" title="About">

    <div class="about-view">

      <UiLogo tag="span"/>
      <span class="about-view__version">{{appVersion}}</span>

      <h2 class="about-view__heading">Secura is a headless password manager</h2>

      <p class="about-view__paragraph">
        Installable web app that stores your services and derives passwords for
        them from their names. It does not use a server to store and access
        data, everything happens on your device!
      </p>

      <h2 class="about-view__heading">Author</h2>

      <div class="about-view__row">
        <UiResponsiveImage class="about-view__image" src="assets/illustrations/me.jpeg"/>
        <p class="about-view__paragraph">
          My name is Georgii Sharadze. I am a software engineer and frontend
          developer from Russia. I like talking about technologies and make
          useful apps like this. My hobbies are mountain skiing, BMX, and
          programming.
        </p>
      </div>

      <h3 class="about-view__subheading">Contact me</h3>

      <p class="about-view__paragraph">
        Email: <a
          title="george.sharadze@gmail.com"
          href="mailto:george.sharadze@gmail.com"
        >
          george.sharadze@gmail.com
        </a>
        <br/>
        Telegram: <a title="sharadbrat" href="https://t.me/sharadbrat" target="_blank">sharadbrat</a>
      </p>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiLogo,
      UiResponsiveImage,
    },
  })
  export default class AboutView extends Vue {

    public get appVersion(): string {
      return process.env.VUE_APP_VERSION;
    }

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

    &__version {
      @include UiMargin(xxxs, top);
      @include UiMargin(sm, bottom);
      @include UiTypographyBodySmall();
      color: UiColor(shade-650);
      display: block;
    }

    &__image {
      @include UiMargin(sm, right);
      $size: $grid-step * 15;
      width: $size;
      height: $size;
      border-radius: $size / 2;
      flex-shrink: 0;

      @include UiMediaMobile() {
        @include UiMargin(xs, bottom, true);
      }
    }

    &__row {
      display: flex;

      @include UiMediaMobile() {
        flex-direction: column;
      }
    }

  }
</style>
