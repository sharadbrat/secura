<template>
  <UiDialog
    class="service-element-dialog"
    :title="title"
    ref="dialog"
    :shouldCloseOnPrimaryButtonClick="false"
    @primary-button-click="onConfirm"
  >
    <template slot="body">
      <div></div>
      <div v-if="service">

        <div class="service-element-dialog__input">
          <span id="name-label" class="service-element-dialog__input-label">Service name</span>
          <UiInput
            aria-labelledby="name-label"
            class="list__input"
            v-model="service.name"
            placeholder="Name (i.e. google-personal-account)"
          />
        </div>

        <div class="service-element-dialog__input">
          <span id="color-label" class="service-element-dialog__input-label">Color</span>
          <UiInput
            aria-labelledby="color-label"
            class="service-element-dialog__input-color"
            v-model="service.color"
            type="color"
            size="sm"
          />
          <div class="service-element-dialog__input-color-container">
            <UiButton
              class="service-element-dialog__input-color-button"
              type="subdued"
              size="sm"
              width="shrink"
              v-for="color in colors"
              :key="color"
              @click="service.color = color"
            >
              <div
                class="service-element-dialog__input-color-button-inner"
                :style="{ 'background-color': color }"
              ></div>
            </UiButton>
          </div>
        </div>

      </div>
    </template>
  </UiDialog>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Emit, Ref } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { NotificationService } from '@/core/service/notification/notification.service';
  import { ServiceEntity } from '@/core/entity/service';
  import { randomInArray } from '@/core/utils/random';

  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiDialog from '@/app/ui-kit/UiDialog.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiSwitchButton from '@/app/ui-kit/UiSwitchButton.vue';


  const colors = [
    '#f44336',
    '#e91e63',
    '#ab47bc',
    '#3f51b5',
    '#03a9f4',
    '#4caf50',
    '#fbc02d',
    '#795548',

    '#e57373',
    '#f48fb1',
    '#ce93d8',
    '#9fa8da',
    '#81d4fa',
    '#a5d6a7',
    '#ffeb3b',
    '#bcaaa4',
  ];


  @Component({
    components: {
      UiButton,
      UiDialog,
      UiInput,
      UiSwitchButton,
    },
  })
  export default class ServiceElementDialog extends Vue {

    public isEditing: boolean = false;

    private service: ServiceEntity = null;

    private readonly colors = colors;

    @LazyInject(NotificationService)
    private notificationService: NotificationService;

    @Ref()
    public dialog: UiDialog;

    public get title(): string {
      return this.isEditing ? 'Edit service' : 'Add service';
    }

    public onConfirm() {
      if (this.service.name.length === 0) {
        this.notificationService.show({
          text: 'Name of a service cannot be empty.',
          type: 'error',
        });
        return;
      }

      this.dialog.hide();
      this.confirm(this.service);
    }

    @Emit()
    public confirm(entity: ServiceEntity): { isEditing: boolean, entity: ServiceEntity } {
      return { isEditing: this.isEditing, entity };
    }

    public show(service?: ServiceEntity) {
      this.isEditing = false;
      this.service = null;
      if (service) {
        this.service = service.clone();
        this.isEditing = true;
      } else {
        this.service = new ServiceEntity({
          id: null,
          color: randomInArray(this.colors),
          name: '',
          pictureId: null,
        });
      }

      this.dialog.show();
    }

  }
</script>


<style scoped lang="scss">
  .service-element-dialog {
    &__input {
      @include UiMargin(sm, bottom);
    }

    &__input-label {
      @include UiTypographyBodyMid();
      @include UiMargin(xxs, bottom);
      display: block;
    }

    &__input-color-button {
    }

    &__input-color-button-inner {
      @include UiBorderRadius(sm);
      $size: $grid-step * 6;
      width: $size;
      height: $size;
    }

    &__input-color {
      width: $grid-step * 30;
    }

    &__input-color-container {
      @include UiMargin(xxs, top);
      @include UiMargin(xxs, bottom);
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      width: fit-content;
    }
  }
</style>