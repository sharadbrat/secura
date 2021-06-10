<template>
  <div class="banner">
    <h2 class="banner__heading">Generate and store passwords on your device</h2>

    <div class="banner__cards-container">
      <UiCard shadow="1" class="banner__card">
        <UiResponsiveImage
          class="banner__card-image"
          src="assets/illustrations/secure.svg"
          mode="contain"
        />
        <h3 class="banner__card-heading">Secure</h3>
        <p class="banner__card-paragraph">
          Secura uses modern cryptography algorithms to generate and store passwords.
        </p>
      </UiCard>

      <UiCard shadow="1" class="banner__card">
        <UiResponsiveImage
          class="banner__card-image"
          src="assets/illustrations/download.svg"
          mode="contain"
        />
        <h3 class="banner__card-heading">On-device</h3>
        <p class="banner__card-paragraph">
          It does not use servers, all data is stored on your device. It works offline!
        </p>
      </UiCard>

      <UiCard shadow="1" class="banner__card">
        <UiResponsiveImage
          class="banner__card-image"
          src="assets/illustrations/install.svg"
          mode="contain"
        />
        <h3 class="banner__card-heading">Installable</h3>
        <p class="banner__card-paragraph">
          It can be installed as standalone app on modern devices.
        </p>
      </UiCard>
    </div>

    <UiButton
      class="banner__start-button"
      size="md"
      @click="onTryButtonClick"
    >
      Try it out now!
    </UiButton>

    <UiDialog
      title="Setup master key"
      ref="keyDialog"
      :shouldCloseOnPrimaryButtonClick="false"
      @primary-button-click="onDialogConfirm"
    >
      <template slot="body">
        <PasswordField v-model="masterKey"/>

        <UiCheckbox
          v-model="isMasterKeyStored"
          class="banner__dialog-checkbox"
          size="sm"
        >
          Store master key in local storage.
        </UiCheckbox>

        <p class="banner__dialog-description">
          A master key is used to derive passwords for the services you want to
          authenticate in. By default, it is not stored in the system and it is
          deleted when you close Secura. If you want to, you can activate
          storing the master key in local storage by clicking on the checkbox
          above. In this case, please note that if an adversary gets access to
          your device - they can easily use your master key to generate your
          passwords.
        </p>
      </template>
    </UiDialog>


  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Ref } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { NotificationService } from '@/core/service/notification/notification.service';
  import { SetMasterKeyUseCase } from '@/core/use-case/keys/set-master-key.use-case';

  import UiCard from '@/app/ui-kit/UiCard.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiDialog from '@/app/ui-kit/UiDialog.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiCheckbox from '@/app/ui-kit/UiCheckbox.vue';
  import PasswordField from '@/app/components/PasswordField.vue';


  @Component({
    components: {
      UiCard,
      UiResponsiveImage,
      UiButton,
      UiDialog,
      UiInput,
      UiIcon,
      UiCheckbox,
      PasswordField,
    },
  })
  export default class MainViewBanner extends Vue {

    @LazyInject(NotificationService)
    public notificationService: NotificationService;

    @LazyInject(SetMasterKeyUseCase)
    public setMasterKeyUseCase: SetMasterKeyUseCase;

    @Ref()
    public keyDialog: UiDialog;

    public masterKey: string = '';

    public isMasterKeyShown: boolean = false;

    public isMasterKeyStored: boolean = false;

    public onTryButtonClick() {
      this.keyDialog.show();
    }

    public onDialogConfirm() {
      if (!this.masterKey.length) {
        this.notificationService.show({ text: 'Master key can not be empty!', type: 'error' });
        return;
      }

      this.setMasterKeyUseCase.perform(this.masterKey, this.isMasterKeyStored);

      this.keyDialog.hide();
    }

  }
</script>


<style scoped lang="scss">
  .banner {

    &__heading {
      @include UiTypographyHeading2();
      @include UiMargin(lg, bottom);
      text-align: center;
    }

    &__cards-container {
      @include UiMargin(lg, bottom);
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: UiGridSpacing(sm);

      @include UiMediaMobile() {
        grid-template-columns: 1fr;
        grid-row-gap: UiGridSpacing(md);
      }
    }

    &__card {
      overflow: hidden;
      @include UiPadding(md);
    }

    &__card-image {
      width: auto;

      @include UiMediaMobile() {
        height: $grid-step * 30;
      }
    }

    &__card-heading {
      @include UiTypographyHeading4();
      @include UiMargin(xs, top);
      @include UiMargin(xs, bottom);
    }

    &__card-paragraph {
      color: UiColor(shade-700);
    }

    &__start-button {
      display: block;
      min-width: $grid-step * 40;
      margin-left: auto;
      margin-right: auto;
    }

    &__dialog-input {
      @include UiMargin(xxs, right);
      flex-grow: 1;
    }

    &__dialog-checkbox {
      @include UiMargin(xs, top);
    }

    &__dialog-description {
      @include UiPadding(xs);
      @include UiMargin(sm, top);
      @include UiBorderRadius(sm);
      background-color: UiColor(neutral-light);
      color: UiColor(neutral-dark);
    }

  }
</style>
