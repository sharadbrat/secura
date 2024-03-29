<template>
  <div class="list">
    <div class="list__heading-row">
      <h2 class="list__heading">Saved services</h2>
      <div>
        <UiButton
          v-if="services.length > 0 && masterKey"
          class="list__button"
          size="sm"
          width="shrink"
          shape="circled"
          :type="isEditing ? 'primary' : 'secondary'"
          @click="isEditing = !isEditing"
        >
          <UiIcon name="edit"/>
        </UiButton>
        <UiButton
          class="list__button"
          size="sm"
          type="secondary"
          width="shrink"
          shape="circled"
          :disabled="!masterKey"
          @click="onAddButtonClick"
        >
          <UiIcon name="add"/>
        </UiButton>
      </div>
    </div>

    <div class="list__container-wrapper">
      <div
        class="list__container"
        :class="{
          'list__container_is-blurred': !masterKey,
        }"
      >
        <div
          v-for="service in services"
          :key="service.id"
          class="list__element"
        >
          <ServiceListElement
            class="list__element-inner"
            :service="service"
            :masterKey="masterKey"
            :isEditable="isEditing"
            :isDisabled="!masterKey"
            :isShowDisabled="!masterKey"
            @edit="onElementEdit(service)"
            @delete="onElementDelete(service)"
          />
        </div>
      </div>
      <div class="list__overlay" v-if="!masterKey">
        <UiIcon class="list__overlay-icon" name="lock"/>
        <UiButton @click="onUnlockClick()">Unlock</UiButton>
      </div>
    </div>

    <div class="list__empty" v-if="services.length === 0">
      <h3 class="list__empty-heading">It is time to add your services into your list!</h3>
      <p class="list__empty-description">Click on the "+" button in the upper right corner to start adding services.</p>
      <UiResponsiveImage class="list__empty-image" src="assets/illustrations/empty.svg"/>
    </div>

    <ServiceElementDialog
      ref="serviceElementDialog"
      @confirm="onServiceDialogConfirm"
    />

    <UiDialog
      :title="`Delete ${deletingServiceName} service?`"
      text="This action is irreversible."
      ref="deleteDialog"
      @primary-button-click="onDeleteConfirm()"
    />

    <UiDialog
      title="Enter your master key"
      ref="keyDialog"
      :shouldCloseOnPrimaryButtonClick="false"
      :isBottomSheetOnMobile="false"
      @primary-button-click="onKeyDialogConfirm()"
    >
      <template slot="body">
        <PasswordField
          v-model="inputMasterKey"
          class="list__dialog-input-row"
          ref="passwordField"
          @confirm="onKeyDialogConfirm()"
        />

        <p class="list__dialog-description">
          Incorrect master key results in incorrectly calculated passwords for
          your services. Make sure the master key you are entering is correct.
        </p>
      </template>
    </UiDialog>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Ref } from 'vue-property-decorator';
  import { Getter, State } from 'vuex-class';

  import { LazyInject } from '@/core/ioc';
  import { NotificationService } from '@/core/service/notification/notification.service';
  import { ServiceEntity } from '@/core/entity/service';
  import { AddServiceUseCase } from '@/core/use-case/services/add-service.use-case';
  import { UpdateServiceUseCase } from '@/core/use-case/services/update-service.use-case';
  import { SetMasterKeyUseCase } from '@/core/use-case/keys/set-master-key.use-case';
  import { RemoveServiceUseCase } from '@/core/use-case/services/remove-service.use-case';

  import UiCard from '@/app/ui-kit/UiCard.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiDialog from '@/app/ui-kit/UiDialog.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import ServiceListElement from '@/app/views/main/components/ServiceListElement.vue';
  import ServiceElementDialog from '@/app/views/main/components/ServiceElementDialog.vue';
  import PasswordField from '@/app/components/PasswordField.vue';


  @Component({
    components: {
      UiCard,
      UiButton,
      UiInput,
      UiIcon,
      UiDialog,
      UiResponsiveImage,
      ServiceListElement,
      ServiceElementDialog,
      PasswordField,
    },
  })
  export default class MainViewList extends Vue {

    @LazyInject(NotificationService)
    public notificationService: NotificationService;

    @LazyInject(AddServiceUseCase)
    public addServiceUseCase: AddServiceUseCase;

    @LazyInject(UpdateServiceUseCase)
    public updateServiceUseCase: UpdateServiceUseCase;

    @LazyInject(RemoveServiceUseCase)
    public removeServiceUseCase: RemoveServiceUseCase;

    @LazyInject(SetMasterKeyUseCase)
    public setMasterKeyUseCase: SetMasterKeyUseCase;

    @Getter('services/sortedServices')
    public services: ServiceEntity[];

    @State(state => state.keys.masterKey)
    public masterKey: string;

    @Ref()
    public serviceElementDialog: ServiceElementDialog;

    @Ref()
    public deleteDialog: UiDialog;

    @Ref()
    public keyDialog: UiDialog;

    @Ref()
    public passwordField: PasswordField;

    public isEditing: boolean = false;

    public inputMasterKey: string = '';

    private deletingService: ServiceEntity = null;

    public get deletingServiceName(): string {
      if (!this.deletingService) {
        return '""';
      }

      return `"${this.deletingService.name}"`;
    }

    public onAddButtonClick() {
      this.isEditing = false;
      this.serviceElementDialog.show();
    }

    public async onServiceDialogConfirm(params: { isEditing: boolean, entity: ServiceEntity }) {
      if (params.isEditing) {
        this.updateServiceUseCase.perform(params.entity);
        return;
      }

      this.addServiceUseCase.perform(params.entity);
    }

    public onElementEdit(service: ServiceEntity) {
      this.serviceElementDialog.show(service);
    }

    public onElementDelete(service: ServiceEntity) {
      this.deletingService = service;
      this.deleteDialog.show();
    }

    public onDeleteConfirm() {
      this.removeServiceUseCase.perform(this.deletingService.id);
    }

    public onUnlockClick() {
      this.keyDialog.show();
      setTimeout(() => this.passwordField.focus(), 50);
    }

    public onKeyDialogConfirm() {
      if (!this.inputMasterKey.length) {
        this.notificationService.show({ text: 'Master key can not be empty!', type: 'error' });
        return;
      }

      this.setMasterKeyUseCase.perform(this.inputMasterKey);
      this.keyDialog.hide();
    }

  }
</script>


<style scoped lang="scss">
  .list {

    &__heading-row {
      @include UiMargin(lg, bottom);
      display: flex;
      align-items: center;
      justify-content: space-between
    }

    &__heading {
      @include UiTypographyHeading2();
    }

    &__container {
      @include UiMarginNegative(xxs, left);
      @include UiMarginNegative(xxs, right);
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      justify-content: stretch;

      &_is-blurred {
        filter: blur(5px);
      }
    }

    &__element {
      @include UiMargin(xs, bottom);
      flex-shrink: 0;
      flex-basis: calc(100% / 3);
      width: calc(100% / 3);

      @include UiMediaTablet() {
        flex-basis: calc(100% / 2);
        width: calc(100% / 2);
      }

      @include UiMediaMobile() {
        flex-basis: 100%;
        width: 100%;
      }
    }

    &__element-inner {
      @include UiMargin(xxs, left);
      @include UiMargin(xxs, right);
      height: 100%;
    }

    &__button {
      @include UiMargin(sm, left)
    }

    &__overlay {
      $outer-space: $grid-step * 2;
      @include UiPadding(md);
      @include UiBorderRadius(sm);
      position: absolute;
      left: - $outer-space;
      top: - $outer-space;

      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(100% + #{$outer-space * 2});
      height: calc(100% + #{$outer-space * 2});

      @include UiTheme() {
        background-color: rgba(UiColor(shade-900), 0.1);
      }
    }

    &__container-wrapper {
      position: relative;
    }

    &__overlay-icon {
      @include UiMargin(md, bottom);
      @include UiPadding(sm);
      $size: $grid-step * 20;
      width: $size;
      height: $size;
      border-radius: $size / 2;

      @include UiTheme() {
        background-color: UiColor(shade-200);
      }
    }

    &__dialog-description {
      @include UiPadding(xs);
      @include UiMargin(sm, top);
      @include UiBorderRadius(sm);

      @include UiTheme() {
        background-color: UiColor(neutral-light);
        color: UiColor(neutral-dark);
      }
    }

    &__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &__empty-heading {
      @include UiTypographyHeading4();
    }

    &__empty-description {
      @include UiTypographyBody2();
      @include UiMargin(xs, top);
    }

    &__empty-image {
      @include UiMargin(lg, top);
    }

  }
</style>
