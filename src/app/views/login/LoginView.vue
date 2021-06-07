<template>
  <UnauthorizedLayout class="login">
    <UiLogo class="login__logo"/>

    <UiCard class="login__card">

      <h1 class="login__title">Войти</h1>

      <UiInput
        class="login__email"
        type="email"
        placeholder="Email"
        v-model="credentials.email"
        :is-block="true"
        :disabled="isAuthInProgress"
        @blur="onEmailBlur()"
      />

      <UiInput
        class="login__password"
        type="password"
        placeholder="Пароль"
        v-model="credentials.password"
        :is-block="true"
        :disabled="isAuthInProgress"
        @blur="onPasswordBlur()"
      />

      <router-link to="forgot-password">
        <UiButton
          type="link"
          class="login__forgot-password"
          :disabled="isAuthInProgress"
        >
          Забыли пароль?
        </UiButton>
      </router-link>

      <UiButton
        class="login__submit"
        width="block"
        @click="onSubmit()"
        :disabled="isSubmitDisabled"
      >
        Войти
      </UiButton>

      <ErrorsList class="login__error" :errors="validationErrorMessages"/>

      <span class="login__oauth-divider"/>

      <GoogleAuth
        @success-auth="onOauthSuccess($event)"
        @fail-auth="onOauthFailure('Google')"
        @start-auth="onAuthStart()"
        :disabled="isAuthInProgress"
      />

    </UiCard>

    <div class="login__question" v-if="!isAuthInProgress">
      Ещё нет аккаунта? | <router-link to="registration">Зарегистрироваться</router-link>
    </div>
  </UnauthorizedLayout>
</template>

<script lang="ts">
  import { Component, Watch } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { LoginUseCase } from '@/core/use-case/user/login.use-case';
  import { LoginCredentialsEntity } from '@/core/entity/auth-credentials';
  import { INVALID_EMAIL, INVALID_PASSWORD } from '@/core/utils/auth-validation-error-messages';
  import { TrackerService } from '@/core/service/tracker/tracker.service';

  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import UiCard from '@/app/ui-kit/UiCard.vue';
  import UnauthorizedLayout from '@/app/layouts/UnauthorizedLayout.vue';
  import GoogleAuth from '@/app/components/GoogleAuth.vue';
  import ErrorsList from '@/app/components/ErrorsList.vue';
  import { AuthView } from '@/app/views/AuthView';


  @Component({
    components: {
      UiButton,
      UiInput,
      UiCard,
      UiLogo,
      UnauthorizedLayout,
      GoogleAuth,
      ErrorsList,
    },
  })
  export default class LoginView extends AuthView {

    public credentials: LoginCredentialsEntity = new LoginCredentialsEntity({
      email: '',
      password: '',
    });

    public isEmailWarningShown: boolean = false;

    public isPasswordWarningShown: boolean = false;

    @LazyInject(LoginUseCase)
    public loginUseCase: LoginUseCase;

    public get isSubmitDisabled(): boolean {
      return this.isAuthInProgress || !this.areCredentialsValid;
    }

    public get validationErrorMessages(): string[] {
      const errors = [];

      if (this.isEmailWarningShown) {
        errors.push(INVALID_EMAIL);
      }

      if (this.isPasswordWarningShown) {
        errors.push(INVALID_PASSWORD);
      }

      return errors;
    }

    @Watch('credentials.email')
    public watchEmail(value: string, prev: string) {
      if (!this.credentials) {
        return;
      }

      this.isEmailWarningShown = false;
      this.areCredentialsValid = this.credentials.isValid;
    }

    @Watch('credentials.password')
    public watchPassword(value: string, prev: string) {
      if (!this.credentials) {
        return;
      }

      this.isPasswordWarningShown = false;
      this.areCredentialsValid = this.credentials.isValid;
    }

    public onSubmit() {
      this.onAuthStart();
      this.loginUseCase.perform(this.credentials)
        .then(token => {
          this.tracker.event(TrackerService.E_CAT.AUTH, TrackerService.E_NAME.LOGIN);
          this.onAuthEnd(token);
        })
        .catch(error => this.onAuthFailure(error));
    }

    public onEmailBlur() {
      if (!this.credentials.isEmailValid) {
        this.isEmailWarningShown = true;
      }
    }

    public onPasswordBlur() {
      if (!this.credentials.isPasswordValid) {
        this.isPasswordWarningShown = true;
      }
    }

  }
</script>

<style scoped lang="scss">
  .login {
    &__card {
      @include UiPadding(md);

      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: $grid-step * 120;
    }

    &__submit {
      @include UiMargin(lg, top);
    }

    &__logo {
      @include UiMargin(md, bottom);
    }

    &__forgot-password {
      @include UiMargin(sm, top);
      @include UiTypographyBodyMid();
    }

    &__email {
      @include UiMargin(lg, top);
    }

    &__password {
      @include UiMargin(md, top);
    }

    &__title {
      @include UiTypographyHeading1();
    }

    &__question {
      @include UiMargin(md, top);
      @include UiTypographyBodyMid();
      color: UiColor(shade-600);
    }

    &__error {
      @include UiMargin(md, top);
    }

    &__oauth-divider {
      @include UiMargin(md);
      border-bottom: 1px solid UiColor(shade-400);
      display: block;
      width: 100%;
    }

  }
</style>
