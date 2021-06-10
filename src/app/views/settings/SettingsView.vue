<template>
  <SecondLevelLayout backUrl="/" title="Settings">

    <div class="settings-view">

      <div>
        <h2 class="settings-view__heading">Master key</h2>
        <UiButton
          class="settings-view__heading-button"
          size="sm"
          width="shrink"
          shape="circled"
          :type="isEditingMasterKey ? 'primary' : 'secondary'"
          @click="isEditingMasterKey = !isEditingMasterKey"
        >
          <UiIcon name="edit"/>
        </UiButton>
      </div>

      <PasswordField
        class="settings-view__password-field"
        :readonly="isEditingMasterKey"
        :value="masterKey"
      />

      <UiCheckbox
        class="settings-view__master-key-checkbox"
        v-model="isMasterKeyStored"
        size="sm"
      >
        Store master key in local storage.
      </UiCheckbox>

      <p class="settings-view__master-key-description">
        A master key is used to derive passwords for the services you want to
        authenticate in. By default, it is not stored in the system and it is
        deleted when you close Secura. If you want to, you can activate
        storing the master key in local storage by clicking on the checkbox
        above. In this case, please note that if an adversary gets access to
        your device - they can easily use your master key to generate your
        passwords.
      </p>

      <h2 class="settings-view__heading">Theme</h2>

      <p>TBD</p>

      <h2 class="settings-view__heading">Danger zone</h2>

      <p>TBD</p>

      <UiButton>
        <UiIcon name="delete"/>
        <span>Delete all saved services</span>
      </UiButton>

      <UiButton>
        <UiIcon name="delete"/>
        <span>Delete all data services</span>
      </UiButton>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiCheckbox from '@/app/ui-kit/UiCheckbox.vue';
  import PasswordField from '@/app/components/PasswordField.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiButton,
      UiIcon,
      UiCheckbox,
      PasswordField,
    },
  })
  export default class SettingsView extends Vue {

    @State(state => state.keys.masterKey)
    public masterKey: string;

    @State(state => state.keys.isPersisted)
    public isMasterKeyStored: string;

    private isEditingMasterKey: boolean = false;

  }
</script>


<style scoped lang="scss">
  .settings-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
    }

    &__password-field {
      @include UiMargin(xxs, right);
      flex-grow: 1;
    }

    &__master-key-checkbox {
      @include UiMargin(xs, top);
    }

    &__master-key-description {
      @include UiPadding(xs);
      @include UiMargin(sm, top);
      @include UiBorderRadius(sm);
      background-color: UiColor(neutral-light);
      color: UiColor(neutral-dark);
    }

  }
</style>
