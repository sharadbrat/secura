<template>
  <UiDialog
    title="Setup master key"
    ref="dialog"
    :shouldCloseOnPrimaryButtonClick="false"
    @primary-button-click="onConfirm"
  >
    <template slot="body">
      <PasswordField ref="passwordField" v-model="masterKey" @confirm="onConfirm"/>

      <UiCheckbox
        v-model="isMasterKeyStored"
        class="setup-master-key-dialog__checkbox"
        size="sm"
      >
        Store master key in local storage.
      </UiCheckbox>

      <p class="setup-master-key-dialog__description">
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
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Emit, Ref } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { NotificationService } from '@/core/service/notification/notification.service';

  import UiDialog from '@/app/ui-kit/UiDialog.vue';
  import UiCheckbox from '@/app/ui-kit/UiCheckbox.vue';
  import PasswordField from '@/app/components/PasswordField.vue';


  @Component({
    components: {
      UiDialog,
      UiCheckbox,
      PasswordField,
    },
  })
  export default class SetupMasterKeyDialog extends Vue {

    @LazyInject(NotificationService)
    public notificationService: NotificationService;

    @Ref()
    public dialog: UiDialog;

    @Ref()
    public passwordField: PasswordField;

    public masterKey: string = '';

    public isMasterKeyStored: boolean = false;

    public show() {
      this.dialog.show();
      setTimeout(() => this.passwordField.focus(), 50);
    }

    public hide() {
      this.dialog.hide();
    }

    public onConfirm() {
      if (!this.masterKey.length) {
        this.notificationService.show({ text: 'Master key can not be empty!', type: 'error' });
        return;
      }

      this.confirm();
    }

    @Emit()
    public confirm(): { key: string, isPersisted: boolean } {
      return {
        key: this.masterKey,
        isPersisted: this.isMasterKeyStored,
      };
    }

  }
</script>

<style scoped lang="scss">
  .setup-master-key-dialog {

    &__checkbox {
      @include UiMargin(xs, top);
    }

    &__description {
      @include UiPadding(xs);
      @include UiMargin(sm, top);
      @include UiBorderRadius(sm);
      background-color: UiColor(neutral-light);
      color: UiColor(neutral-dark);
    }

  }
</style>
