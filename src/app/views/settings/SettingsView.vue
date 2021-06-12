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
        <h2 class="settings-view__heading">Import & Export</h2>
        <p class="settings-view__description">
          Share your services list (<b>and only them</b>) between your
          devices through import & export.
          <br/>
          Click "Export", enter the encription key, and download your services
          as an encrypted file.
          <br/>
          Send this file another device, open settings page, and click "Import".
          Put in your encryption key and voila - your services are imported.
        </p>
        <div class="settings-view__row">
          <UiButton
            class="settings-view__import-button"
            size="sm"
            type="secondary"
            @click="onImportClick()"
          >
            <UiIcon class="settings-view__import-icon" name="download"/>
            <span>Import</span>
          </UiButton>
          <UiButton
            class="settings-view__import-button"
            size="sm"
            type="secondary"
            @click="onExportClick()"
          >
            <UiIcon class="settings-view__import-icon" name="upload"/>
            <span>Export</span>
          </UiButton>
        </div>
      </section>

      <section class="settings-view__section">
        <h2 class="settings-view__heading">Danger zone</h2>

        <div class="settings-view__danger-zone">
          <h3 class="settings-view__subheading">Delete services</h3>
          <p class="settings-view__description">
            Theme settings and the master key will remain, only saved services
            will be deleted.
          </p>
          <UiButton
            class="settings-view__delete"
            size="sm"
            type="secondary"
            @click="onDeleteServicesClick()"
          >
            <UiIcon class="settings-view__delete-icon" name="delete"/>
            <span>Delete all saved services</span>
          </UiButton>

          <hr class="settings-view__danger-zone-delimiter"/>

          <h3 class="settings-view__subheading">Delete everything</h3>
          <p class="settings-view__description">
            All the data will be deleted, you will be redirected to the main page.
          </p>

          <UiButton
            class="settings-view__delete-button settings-view__delete-all"
            size="sm"
            @click="onDeleteAllClick()"
          >
            <UiIcon class="settings-view__delete-icon" name="delete"/>
            <span>Delete all data</span>
          </UiButton>
        </div>
      </section>

      <SetupMasterKeyDialog ref="masterKeyDialog" @confirm="onSetupMasterKeyConfirm"/>

      <UiDialog
        title="Do you want to delete all services?"
        text="This action is irreversible, think twice."
        ref="deleteAllServicesDialog"
        @primary-button-click="onDeleteAllServicesDialogConfirm()"
      />

      <UiDialog
        title="Do you want to delete everything?"
        text="This action is irreversible, think twice."
        ref="deleteAllDialog"
        @primary-button-click="onDeleteAllDialogConfirm()"
      />

      <UiDialog
        title="Import"
        ref="importDialog"
        @primary-button-click="onImportConfirm()"
        @secondary-button-click="importEncryptionKey = ''"
      >
        <template slot="body">
          <span class="settings-view__import-label" id="import-encryption-key">Encryption key</span>
          <UiInput
            v-model="importEncryptionKey"
            placeholder="(can be empty)"
            size="sm"
            type="password"
            aria-labelledby="import-encryption-key"
          />

          <span class="settings-view__import-label" id="data-file">Data file</span>
          <input
            class="settings-view__import-file"
            type="file"
            ref="upload"
            accept=".txt"
            aria-labelledby="data-file"
            @change="onUploadFile"
          />
        </template>
      </UiDialog>

      <UiDialog
        title="Export"
        ref="exportDialog"
        @primary-button-click="onExportConfirm()"
        @secondary-button-click="importEncryptionKey = ''"
      >
        <template slot="body">
          <span class="settings-view__import-label" id="export-encryption-key">Encryption key</span>
          <UiInput
            v-model="importEncryptionKey"
            placeholder="(can be empty)"
            size="sm"
            type="password"
            aria-labelledby="export-encryption-key"
          />
        </template>
      </UiDialog>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Ref } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { SetMasterKeyUseCase } from '@/core/use-case/keys/set-master-key.use-case';
  import { RemoveAllServicesUseCase } from '@/core/use-case/services/remove-all-services.use-case';
  import { RemoveAllUseCase } from '@/core/use-case/services/remove-all.use-case';
  import { ExportUseCase } from '@/core/use-case/import/export.use-case';
  import { ImportUseCase } from '@/core/use-case/import/import.use-case';
  import { NotificationService } from '@/core/service/notification/notification.service';
  import { download } from '@/core/utils/download';

  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiDialog from '@/app/ui-kit/UiDialog.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import SetupMasterKeyDialog from '@/app/components/SetupMasterKeyDialog.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiButton,
      UiIcon,
      UiDialog,
      UiInput,
      SetupMasterKeyDialog,
    },
  })
  export default class SettingsView extends Vue {

    @LazyInject(SetMasterKeyUseCase)
    public setMasterKeyUseCase: SetMasterKeyUseCase;

    @LazyInject(RemoveAllServicesUseCase)
    public removeAllServicesUseCase: RemoveAllServicesUseCase;

    @LazyInject(RemoveAllUseCase)
    public removeAllUseCase: RemoveAllUseCase;

    @LazyInject(ImportUseCase)
    public importUseCase: ImportUseCase;

    @LazyInject(ExportUseCase)
    public exportUseCase: ExportUseCase;

    @LazyInject(NotificationService)
    public notificationService: NotificationService;

    @Ref()
    public masterKeyDialog: SetupMasterKeyDialog;

    @Ref()
    public deleteAllServicesDialog: UiDialog;

    @Ref()
    public deleteAllDialog: UiDialog;

    @Ref()
    public importDialog: UiDialog;

    @Ref()
    public exportDialog: UiDialog;

    @Ref()
    public upload: HTMLInputElement;

    public importEncryptionKey: string = '';

    public importDataFile: Blob = null;

    private isEditingMasterKey: boolean = false;

    public onSetupMasterKeyClick() {
      this.masterKeyDialog.show();
    }

    public onSetupMasterKeyConfirm(params: { key: string, isPersisted: boolean }) {
      this.setMasterKeyUseCase.perform(params.key, params.isPersisted);
      this.masterKeyDialog.hide();
    }

    public onImportClick() {
      this.importDialog.show();
    }

    public onExportClick() {
      this.exportDialog.show();
    }

    public onDeleteServicesClick() {
      this.deleteAllServicesDialog.show();
    }

    public onDeleteAllClick() {
      this.deleteAllDialog.show();
    }

    public async onDeleteAllServicesDialogConfirm() {
      try {
        await this.removeAllServicesUseCase.perform();

        this.notificationService.show({
          type: 'info',
          text: 'Successfully deleted all services!',
        });
      } catch (error) {
        this.notificationService.show({
          type: 'error',
          text: `Could not delete services, reason: ${error.message}.`,
        });
      }
    }

    public async onDeleteAllDialogConfirm() {
      try {
        await this.removeAllUseCase.perform();
        this.$router.replace('/');
        this.notificationService.show({
          type: 'info',
          text: 'Successfully deleted all data!',
        });
      } catch (error) {
        this.notificationService.show({
          type: 'error',
          text: `Could not delete all data, reason: ${error.message}.`,
        });
      }
    }

    public async onImportConfirm() {
      if (!this.importDataFile) {
        this.notificationService.show({
          type: 'error',
          text: 'Please, provide the data file!',
        });
      }

      try {
        const cypher = await this.importDataFile.text();
        await this.importUseCase.perform(cypher, this.importEncryptionKey);

        this.importEncryptionKey = '';
        this.importDataFile = null;
        this.upload.value = null;

        this.notificationService.show({
          type: 'info',
          text: 'Successfully imported data!',
        });
      } catch (error) {
        this.notificationService.show({
          type: 'error',
          text: 'Could not import data, make sure the encryption key and corresponding file are correct!',
        });

        this.importEncryptionKey = '';
        this.importDataFile = null;
        this.upload.value = null;
      }
    }

    public onUploadFile() {
      const files: ReadonlyArray<File> = [...(this.upload.files ? this.upload.files : [])];
      [this.importDataFile] = files;
    }

    public async onExportConfirm() {
      try {
        const cypher = await this.exportUseCase.perform(this.importEncryptionKey);
        download('secura-services-list', cypher);
        this.importEncryptionKey = '';
      } catch (error) {
        this.notificationService.show({
          type: 'error',
          text: `Could not export data, reason: ${error.message}`,
        });

        this.importEncryptionKey = '';
      }
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

      b {
        font-weight: map_get($font-weight, bold);
      }

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

    &__import-button {
      @include UiMargin(sm, right);
      color: UiColor(warning-dark);
      border-color: UiColor(warning);
    }

    &__import-icon {
      @include UiMargin(xxs, right);
      margin-bottom: 2px;
    }

    &__import-label {
      @include UiTypographyBody2();
      @include UiMargin(xxs, bottom);
      @include UiMargin(sm, top);
      display: block;
    }

  }
</style>
