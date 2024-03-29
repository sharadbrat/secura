<template>
  <SecondLevelLayout backUrl="/" title="About">

    <div class="about-view">

      <UiLogo tag="span"/>
      <span class="about-view__version">{{appVersion}}</span>

      <h2 class="about-view__heading">Secura: Headless password manager</h2>

      <p class="about-view__paragraph">
        Installable web app that stores your services and derives passwords for
        them from their names. It does not use a server to store and access
        data, everything happens on your device!
        <router-link to="about/changelog">View changelog</router-link>.
      </p>

      <UiButton
        v-if="canShare"
        size="sm"
        type="secondary"
        @click="onShareClick()"
      >
        Share
        <UiIcon class="about-view__button-icon" name="share"/>
      </UiButton>

      <h2 class="about-view__heading">FAQ</h2>

      <p class="about-view__paragraph">
        <b>How is my data stored?</b>
        Secura does not store passwords neither as plain text, nor as encrypted
        cypher. Instead, it assigns a GUID (Globally Unique Identifier) for each
        created service. Then, when you set your master key, the password for
        each service is generated with <code>sha256</code> hash function,
        using the concatenated master key and GUID as hash-salt.
        <br/>
        <br/>
        The master key is not stored by default as it is not recommended. However,
        you can decide to store the master key on your device, in this case the
        master key is stored as <code>sha256</code> hash string.
      </p>

      <p class="about-view__paragraph">
        <b>Where is my data stored?</b>
        All persisted data is stored on the device. Services are saved in
        <a href="https://developer.mozilla.org/ru/docs/Web/API/IndexedDB_API" target="_blank" title="IndexedDB">IndexedDB</a>
        local database. The master key (if you decided to save it) is stored in
        <a href="https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage" target="_blank" title="Local storage">Local storage</a>.
      </p>

      <p class="about-view__paragraph">
        <b>Who has access to my data?</b>
        All your data is stored on the device, the only person that has access to
        the persisted data is the holder of the device. The data is not transferred
        over the internet to any first- or third- parties.
      </p>

      <h2 class="about-view__heading">Author</h2>

      <div class="about-view__row">
        <UiResponsiveImage class="about-view__image" src="assets/illustrations/me.jpeg"/>
        <p class="about-view__paragraph">
          My name is Georgii Sharadze. I am a software engineer and frontend
          developer from Russia. I like technologies and I make useful apps like
          Secura. My hobbies are mountain skiing, BMX, and programming. Check out
          <a href="https://github.com/sharadbrat/sharadbrat" title="Blog of Georgii Sharadze" target="_blank">my blog</a>!
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
        <br/>
        <br/>
        Feel free to give comments and feedback, ask questions, and request for features!
      </p>

      <h2 class="about-view__heading">Other credits</h2>

      <p class="about-view__paragraph">
        Illustrations by <a title="undraw.co" href="https://undraw.co/" target="_blank">undraw.co</a>.
      </p>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { ConfigService } from '@/core/service/config/config.service';

  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiLogo,
      UiResponsiveImage,
      UiButton,
      UiIcon,
    },
  })
  export default class AboutView extends Vue {

    @LazyInject(ConfigService)
    private configService: ConfigService;

    public get canShare(): boolean {
      // any is hack that allows typescript to compile this
      const nav = navigator as any;
      return Boolean(nav.share);
    }

    public get appVersion(): string {
      return process.env.VUE_APP_VERSION;
    }

    public onShareClick() {
      // any is hack that allows typescript to compile this
      const nav = navigator as any;
      nav.share({
        url: this.configService.frontendConfig.rootUrl,
        text: 'Headless password manager.',
        title: 'Secura',
      });
    }

  }
</script>


<style scoped lang="scss">
  .about-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
      @include UiMargin(md, top);
    }

    &__subheading {
      @include UiTypographyHeading4();
      @include UiMargin(sm, bottom);
      @include UiMargin(sm, top);
    }

    &__paragraph {
      @include UiMargin(xs, bottom);

      > b {
        @include UiMargin(xxs, bottom);
        @include UiPadding(xxxs, bottom);
        display: block;
        width: fit-content;
        font-weight: map_get($font-weight, bold);

        @include UiTheme() {
          border-bottom: 2px solid UiColor(shade-500);
        }
      }

      > code {
        @include UiTypographyModifyMonospace();
        @include UiPadding(xxs, left);
        @include UiPadding(xxs, right);
        @include UiBorderRadius(xs);
        display: inline-block;
        padding-top: 1px;
        padding-bottom: 1px;
        @include UiTheme() {
          background-color: UiColor(shade-400);
        }
      }

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

    &__button-icon {
      @include UiMargin(xxs, left);
    }

  }
</style>
