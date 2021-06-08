<template>
  <div class="list">
    <div class="list__heading-row">
      <h2 class="list__heading">Saved services</h2>
      <div>
        <UiButton
          v-if="services.length > 0"
          class="list__button"
          size="sm"
          :type="isEditing ? 'primary' : 'secondary'"
          width="shrink"
          shape="circled"
          @click="isEditing = !isEditing"
        >
          <UiIcon :name="isEditing ? 'edit-off' : 'edit'"/>
        </UiButton>
        <UiButton
          class="list__button"
          size="sm"
          type="secondary"
          width="shrink"
          shape="circled"
          @click="onAddButtonClick"
        >
          <UiIcon name="add"/>
        </UiButton>
      </div>
    </div>

    <div class="list__container">
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
        />
      </div>
    </div>

    <UiDialog
      title="Add service"
      ref="addDialog"
      :shouldCloseOnPrimaryButtonClick="false"
      @primary-button-click="onAddDialogConfirm"
    >
      <template slot="body">
        <UiInput
          class="list__input"
          v-model="name"
          placeholder="Name (i.e. google-personal-account)"
        />

        <UiInput
          class="list__input list__input_color"
          v-model="color"
          type="color"
          size="sm"
        />
      </template>
    </UiDialog>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Ref } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import { LazyInject } from '@/core/ioc';
  import { NotificationService } from '@/core/service/notification/notification.service';
  import { ServiceEntity } from '@/core/entity/service';
  import { AddServiceUseCase } from '@/core/use-case/services/add-service.use-case';

  import UiCard from '@/app/ui-kit/UiCard.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiDialog from '@/app/ui-kit/UiDialog.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import ServiceListElement from '@/app/views/main/components/ServiceListElement.vue';


  @Component({
    components: {
      UiCard,
      UiButton,
      UiDialog,
      UiInput,
      UiIcon,
      ServiceListElement,
    },
  })
  export default class MainViewList extends Vue {

    @LazyInject(NotificationService)
    public notificationService: NotificationService;

    @LazyInject(AddServiceUseCase)
    public addServiceUseCase: AddServiceUseCase;

    @State(state => state.services.services)
    public services: ServiceEntity[];

    @State(state => state.keys.masterKey)
    public masterKey: string;

    @Ref()
    public addDialog: UiDialog;

    public name: string = '';

    public color: string = '#4db6ac';

    public isEditing: boolean = false;

    public onAddButtonClick() {
      this.addDialog.show();
    }

    public async onAddDialogConfirm() {
      const service = new ServiceEntity({
        id: null,
        pictureId: null,
        name: this.name,
        color: this.color,
      });

      await this.addServiceUseCase.perform(service);

      this.addDialog.hide();
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

  }
</style>
