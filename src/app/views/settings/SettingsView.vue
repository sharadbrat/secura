<template>
  <SecondLevelLayout backUrl="/" title="Settings">

    <div class="settings-view">

      <section class="settings-view__section">
        <h2 class="settings-view__heading">Set master key</h2>
        <p class="settings-view__description">
          The master key is used to generate passwords for all your saved services.
          By default, it is only stored during a single session. However, you may
          choose to store it in the local storage to share it between sessions,
          but it is not recommended.
        </p>
        <p class="settings-view__description settings-view__description_highlighted">
          It is not stored as-is (neither in a single session, nor in
          local storage), that is why it is impossible to modify it, only to
          set a new one.
        </p>
        <UiButton type="secondary" @click="onSetupMasterKeyClick">Set master key</UiButton>
      </section>

      <section class="settings-view__section">
        <h2 class="settings-view__heading">Theme</h2>
        <p>TBD</p>
      </section>

      <section class="settings-view__section">
        <h2 class="settings-view__heading">Danger zone</h2>

        <div class="settings-view__danger-zone">
          <h3 class="settings-view__subheading">Delete services</h3>
          <p class="settings-view__description">
            Theme settings and the master key will remain, only saved services
            will be deleted.
          </p>
          <UiButton size="sm" type="secondary" class="settings-view__delete">
            <UiIcon class="settings-view__delete-icon" name="delete"/>
            <span>Delete all saved services</span>
          </UiButton>

          <hr class="settings-view__danger-zone-delimiter"/>

          <h3 class="settings-view__subheading">Delete everything</h3>
          <p class="settings-view__description">
            All the data will be deleted, you will be redirected to the main page.
          </p>

          <UiButton size="sm" class="settings-view__delete-button settings-view__delete-all">
            <UiIcon class="settings-view__delete-icon" name="delete"/>
            <span>Delete all data</span>
          </UiButton>
        </div>
      </section>

      <SetupMasterKeyDialog ref="masterKeyDialog" @confirm="onSetupMasterKeyConfirm"/>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Ref } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import { LazyInject } from '@/core/ioc';
  import { SetMasterKeyUseCase } from '@/core/use-case/keys/set-master-key.use-case';

  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import SetupMasterKeyDialog from '@/app/components/SetupMasterKeyDialog.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiButton,
      UiIcon,
      SetupMasterKeyDialog,
    },
  })
  export default class SettingsView extends Vue {

    @LazyInject(SetMasterKeyUseCase)
    public setMasterKeyUseCase: SetMasterKeyUseCase;

    @State(state => state.keys.masterKey)
    public masterKey: string;

    @State(state => state.keys.isPersisted)
    public isMasterKeyStored: string;

    @Ref()
    public masterKeyDialog: SetupMasterKeyDialog;

    private isEditingMasterKey: boolean = false;

    public onSetupMasterKeyClick() {
      this.masterKeyDialog.show();
    }

    public onSetupMasterKeyConfirm(params: { key: string, isPersisted: boolean }) {
      this.setMasterKeyUseCase.perform(params.key, params.isPersisted);
      this.masterKeyDialog.hide();
    }

  }
</script>


<style scoped lang="scss">
  .settings-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
    }

    &__subheading {
      @include UiTypographyBody1();
      @include UiMargin(xxs, bottom);
    }

    &__section {
      @include UiMargin(md, bottom);
      @include UiPadding(md, bottom);
      border-bottom: 1px solid UiColor(shade-400);
    }

    &__description {
      @include UiMargin(md, bottom);

      &_highlighted {
        @include UiBorderRadius(sm);
        @include UiPadding(xs);
        background-color: UiColor(neutral-light);
        color: UiColor(neutral-dark);
      }
    }

    &__delete {
      border-color: UiColor(negative);
      color: UiColor(negative);
    }

    &__delete-all {
      background-color: UiColor(negative);
    }

    &__delete-icon {
      @include UiMargin(xxs, right);
      margin-bottom: 2px;
    }

    &__danger-zone {
      @include UiBorderRadius(md);
      @include UiPadding(md);
      border: 1px solid UiColor(negative-light);
    }

    &__danger-zone-delimiter {
      @include UiMargin(md, top);
      @include UiMargin(md, bottom);
      border-bottom: 1px solid UiColor(shade-400);
    }

  }
</style>
