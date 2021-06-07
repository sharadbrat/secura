<template>
  <div class="google-auth">
    <UiButton
      ref="button"
      type="secondary"
      width="block"
      :disabled="isDisabled"
    >
      <UiIcon name="google" class="google-auth__icon"/>
      Войти через Google
    </UiButton>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component, Emit, Prop, Ref,
  } from 'vue-property-decorator';

  import { OauthToken } from '@/core/repository/user/user.repository';

  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import { LazyInject } from '@/core/ioc';
  import { ConfigService } from '@/core/service/config/config.service';


  @Component({
    components: {
      UiButton,
      UiIcon,
    },
  })
  export default class GoogleAuth extends Vue {

    private isDestroyed: boolean = false;

    @Ref() public button: UiButton;

    @Prop({ default: false }) public disabled: boolean;

    @LazyInject(ConfigService)
    private configService: ConfigService;

    public isReady: boolean = false;

    public get isDisabled(): boolean {
      return !this.isReady || this.disabled;
    }

    protected created() {
      this.initGoogleAuth();
    }

    protected beforeDestroy() {
      this.isDestroyed = true;
    }

    public async initGoogleAuth() {
      this.isReady = false;

      await this.injectGoogleApiScript();

      await this.loadAuthLibrary();

      await this.initGoogleAuthButton();

      this.isReady = true;
    }

    public async initGoogleAuthButton() {
      const config = this.configService.getFrontendConfig().oauth.google;
      // gapi is declared on window object, it is a part of google api, though TS does not know
      // this of course, we just ignore the compilation error here, since it is not an error
      // @ts-ignore
      const auth2 = await gapi.auth2.init(config);
      if (!this.isDestroyed) {
        auth2.attachClickHandler(
          this.button.$el,
          {},
          this.onGoogleAuthSuccess.bind(this),
          this.onAuthFailure.bind(this),
        );
      }
    }

    public loadAuthLibrary(): Promise<any> {
      // @ts-ignore
      return new Promise(resolve => gapi.load('auth2', resolve));
    }

    public injectGoogleApiScript(): Promise<void> {
      return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api:client.js';
        script.onload = () => resolve();
        document.head.append(script);
      });
    }

    public onGoogleAuthSuccess(user) {
      this.onStartAuth();
      const oauthToken = user.getAuthResponse().id_token;
      this.onSuccessAuth(oauthToken);
    }

    public onAuthFailure({ error }) {
      if (error !== 'popup_closed_by_user') {
        this.onFailAuth();
      }
    }

    @Emit('fail-auth')
    public onFailAuth() {
      return true;
    }

    @Emit('start-auth')
    public onStartAuth() {
      return true;
    }

    @Emit('success-auth')
    public onSuccessAuth(token: OauthToken): OauthToken {
      return token;
    }

  }
</script>

<style scoped lang="scss">
  .google-auth {
    width: 100%;

    &__icon {
      @include UiMargin(sm, right);
    }
  }
</style>
