<template>
  <UnauthorizedLayout class="register">
    <UiLogo class="register__logo" type="big"/>

    <UiCard class="register__card">

      <h1 class="register__title">Зарегистрироваться</h1>

      <UiInput
        class="register__email"
        type="email"
        placeholder="Email"
        :is-block="true"
        v-model="credentials.email"
        :disabled="isAuthInProgress"
        @blur="onEmailBlur()"
      />

      <UiInput
        class="register__name"
        type="text"
        placeholder="Имя пользователя"
        v-model="credentials.name"
        :is-block="true"
        :disabled="isAuthInProgress"
        @blur="onNameBlur()"
      />

      <UiInput
        class="register__password"
        type="password"
        placeholder="Пароль"
        v-model="credentials.password"
        :is-block="true"
        :disabled="isAuthInProgress"
        @blur="onPasswordBlur()"
      />

      <div class="register__terms">
        Нажимая кнопку "Зарегистрироваться", вы соглашаетесь с нашей
        <router-link to="#">Политикой конфиденциальности</router-link>
      </div>

      <UiButton
        width="block"
        class="register__submit"
        @click="onSubmit()"
        :disabled="isSubmitDisabled"
      >
        Зарегистрироваться
      </UiButton>

      <ErrorsList class="register__error" :errors="validationErrorMessages"/>

      <span class="register__oauth-divider"/>

      <GoogleAuth
        @success-auth="onOauthSuccess($event)"
        @fail-auth="onOauthFailure('Google')"
        @start-auth="onAuthStart()"
        :disabled="isAuthInProgress"
      />

    </UiCard>

    <div class="register__question" v-if="!isAuthInProgress">
      Уже есть аккаунт? | <router-link to="login">Войти</router-link>
    </div>
  </UnauthorizedLayout>
</template>

<script lang="ts">
  import { Component, Watch } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { RegisterCredentialsEntity } from '@/core/entity/auth-credentials';
  import { RegisterUseCase } from '@/core/use-case/user/register.use-case';
  import { INVALID_EMAIL, INVALID_NAME, INVALID_PASSWORD } from '@/core/utils/auth-validation-error-messages';

  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
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
      UiLogo,
      UiCard,
      UnauthorizedLayout,
      GoogleAuth,
      ErrorsList,
    },
  })
  export default class RegistrationView extends AuthView {

    public credentials: RegisterCredentialsEntity = new RegisterCredentialsEntity({
      email: '',
      name: '',
      password: '',
    });

    public isEmailWarningShown: boolean = false;

    public isPasswordWarningShown: boolean = false;

    public isNameWarningShown: boolean = false;

    @LazyInject(RegisterUseCase)
    public registerUseCase: RegisterUseCase;

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

      if (this.isNameWarningShown) {
        errors.push(INVALID_NAME);
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

    @Watch('credentials.name')
    public watchName(value: string, prev: string) {
      if (!this.credentials) {
        return;
      }

      this.isNameWarningShown = false;
      this.areCredentialsValid = this.credentials.isValid;
    }

    public onSubmit() {
      this.registerUseCase.perform(this.credentials)
        .then(token => this.onAuthEnd(token))
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

    public onNameBlur() {
      if (!this.credentials.isNameValid) {
        this.isNameWarningShown = true;
      }
    }

  }
</script>

<style scoped lang="scss">
  .register {
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
      @include UiTypographyBody2();
    }

    &__email {
      @include UiMargin(lg, top);
    }

    &__password {
      @include UiMargin(md, top);
    }

    &__name {
      @include UiMargin(md, top);
    }

    &__title {
      @include UiTypographyHeading1();
    }

    &__question {
      @include UiMargin(sm, top);
      @include UiTypographyBodyMid();
      color: UiColor(shade-600);
    }

    &__terms {
      @include UiTypographyBodyMid();
      @include UiMargin(sm, top);
      color: UiColor(shade-500);
      text-align: center;
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
