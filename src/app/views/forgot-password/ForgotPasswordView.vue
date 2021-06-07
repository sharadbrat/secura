<template>
  <UnauthorizedLayout class="forgot-password">
    <UiLogo class="forgot-password__logo"/>

    <UiCard v-if="!isSubmitted" class="forgot-password__card">

      <h1 class="forgot-password__title">Забыли пароль?</h1>

      <p class="forgot-password__caption">Мы вышлем письмо с инструкцией на указанную почту:</p>

      <UiInput
        class="forgot-password__email"
        type="email"
        placeholder="example@mail.com"
        v-model="email"
        :is-block="true"
        :disabled="isInProgress"
        @blur="onEmailBlur()"
      />

      <UiButton
        class="forgot-password__submit"
        width="block"
        @click="onSubmit()"
        :disabled="isSubmitDisabled"
      >
        Подтвердить
      </UiButton>

      <ErrorsList class="forgot-password__error" :errors="validationErrorMessages"/>

      <router-link to="login" class="forgot-password__back">
        <UiButton type="link" :disabled="isInProgress">Назад</UiButton>
      </router-link>

    </UiCard>

    <UiCard v-else class="forgot-password__card">

      <h1 class="forgot-password__title">Мы выслали инструкции</h1>

      <p class="forgot-password__caption">
        На почтовый адрес <b class="forgot-password__caption_accent">{{email}}</b> было отправлено письмо.
        Следуйте инструкциям в письме, чтобы восстановить свою учетную запись.
      </p>

    </UiCard>

  </UnauthorizedLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Watch } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { ForgotPasswordUseCase } from '@/core/use-case/user/forgot-password.use-case';
  import { CredentialsValidator } from '@/core/entity/auth-credentials';
  import { NotificationService } from '@/core/service/notification/notification.service';
  import { INVALID_EMAIL } from '@/core/utils/auth-validation-error-messages';

  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import UiCard from '@/app/ui-kit/UiCard.vue';
  import ErrorsList from '@/app/components/ErrorsList.vue';
  import UnauthorizedLayout from '@/app/layouts/UnauthorizedLayout.vue';


  @Component({
    components: {
      UiButton,
      UiInput,
      UiCard,
      UiLogo,
      UnauthorizedLayout,
      ErrorsList,
    },
  })
  export default class ForgotPasswordView extends Vue {

    private credentialsValidator: CredentialsValidator = new CredentialsValidator();

    @LazyInject(ForgotPasswordUseCase)
    public forgotPasswordUseCase: ForgotPasswordUseCase;

    @LazyInject(NotificationService)
    public notificationService: NotificationService;

    public email: string = '';

    public isEmailWarningShown: boolean = false;

    public isInProgress: boolean = false;

    public isSubmitted: boolean = false;

    public get isSubmitDisabled(): boolean {
      return this.isInProgress || !this.isValid;
    }

    public get isValid(): boolean {
      return this.credentialsValidator.isEmailValid(this.email);
    }

    public get validationErrorMessages(): string[] {
      const errors = [];

      if (this.isEmailWarningShown) {
        errors.push(INVALID_EMAIL);
      }

      return errors;
    }

    @Watch('email')
    public watchEmail(value: string, prev: string) {
      if (!this.email) {
        return;
      }

      this.isEmailWarningShown = false;
    }

    public onSubmit() {
      this.isInProgress = true;
      this.forgotPasswordUseCase.perform(this.email)
        .then(() => this.isSubmitted = true)
        .catch(error => this.notificationService.showErrors([error]))
        .finally(() => this.isInProgress = false);
    }

    public onEmailBlur() {
      if (!this.isValid) {
        this.isEmailWarningShown = true;
      }
    }

  }
</script>

<style scoped lang="scss">
  .forgot-password {
    &__card {
      @include UiPadding(md);

      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: $grid-step * 120;
    }

    &__submit {
      @include UiMargin(md, bottom);
    }

    &__logo {
      @include UiMargin(md, bottom);
    }

    &__email {
      @include UiMargin(md, bottom);
    }

    &__title {
      @include UiTypographyHeading1();
      @include UiMargin(lg, bottom);
    }

    &__error {
      @include UiMargin(md, bottom);
    }

    &__caption {
      @include UiMargin(xs, bottom);
      color: UiColor(shade-700);

      &_accent {
        font-weight: map_get($font-weight, semibold);
        text-decoration: underline;
      }
    }

    &__back {
      @include UiMargin(sm, top);
    }

  }
</style>
