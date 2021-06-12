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

    <SetupMasterKeyDialog ref="keyDialog" @confirm="onDialogConfirm"/>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Ref } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { SetMasterKeyUseCase } from '@/core/use-case/keys/set-master-key.use-case';

  import UiCard from '@/app/ui-kit/UiCard.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import SetupMasterKeyDialog from '@/app/components/SetupMasterKeyDialog.vue';


  @Component({
    components: {
      UiCard,
      UiResponsiveImage,
      UiButton,
      UiIcon,
      SetupMasterKeyDialog,
    },
  })
  export default class MainViewBanner extends Vue {

    @LazyInject(SetMasterKeyUseCase)
    public setMasterKeyUseCase: SetMasterKeyUseCase;

    @Ref()
    public keyDialog: SetupMasterKeyDialog;

    public onTryButtonClick() {
      this.keyDialog.show();
    }

    public onDialogConfirm(params: { key: string, isPersisted: boolean }) {
      this.setMasterKeyUseCase.perform(params.key, params.isPersisted);
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

      @include UiMediaMobile() {
        @include UiPadding(md, top, false);
      }
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

  }
</style>
