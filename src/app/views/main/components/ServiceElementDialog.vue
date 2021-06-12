<template>
  <div>
    <UiDialog
      class="service-element-dialog"
      :title="title"
      ref="dialog"
      :shouldCloseOnPrimaryButtonClick="false"
      @primary-button-click="onConfirm"
    >
      <template slot="body">
        <div class="service-element-dialog__input">
          <span id="name-label" class="service-element-dialog__input-label">Service name</span>
          <UiInput
            ref="nameField"
            v-if="service"
            aria-labelledby="name-label"
            class="list__input"
            v-model="service.name"
            placeholder="Name (i.e. google-personal-account)"
          />
        </div>
        <div class="service-element-dialog__input">
          <span id="icon-label" class="service-element-dialog__input-label">Icon</span>
          <UiButton
            class="service-element-dialog__image-button"
            type="secondary"
            width="shrink"
            shape="circled"
            aria-labelledby="icon-label"
            ref="imageSelectButton"
          >
            <UiResponsiveImage
              v-if="selectedImage"
              class="service-element-dialog__image"
              :src="selectedImage.url"
            />
          </UiButton>
        </div>

        <div class="service-element-dialog__input">
          <span id="color-label" class="service-element-dialog__input-label">Label</span>
          <UiInput
            v-if="service"
            aria-labelledby="color-label"
            class="service-element-dialog__input-color"
            v-model="service.color"
            type="color"
            size="sm"
          />
          <div class="service-element-dialog__input-color-container" v-if="service">
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
      </template>
    </UiDialog>

    <UiMenu
      v-if="imageSelectButtonEl"
      class="service-element-dialog__image-menu"
      ref="imageMenu"
      :triggerElement="imageSelectButtonEl"
    >
      <span class="service-element-dialog__image-menu-heading">Logo</span>

      <div class="service-element-dialog__image-menu-list">
        <UiButton
          v-for="image in logos"
          :key="image.id"
          class="service-element-dialog__image-button"
          type="transparent"
          width="shrink"
          shape="circled"
          @click="onImageSelect(image)"
        >
          <UiResponsiveImage
            class="service-element-dialog__image"
            :src="image.url"
          />
        </UiButton>
      </div>

      <span class="service-element-dialog__image-menu-heading">Emoji</span>
      <div class="service-element-dialog__image-menu-list">
        <UiButton
          v-for="image in emojis"
          :key="image.id"
          class="service-element-dialog__image-button"
          type="transparent"
          width="shrink"
          shape="circled"
          @click="onImageSelect(image)"
        >
          <UiResponsiveImage
            class="service-element-dialog__image"
            :src="image.url"
          />
        </UiButton>
      </div>
    </UiMenu>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Emit, Ref } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';

  import { LazyInject } from '@/core/ioc';
  import { NotificationService } from '@/core/service/notification/notification.service';
  import { ServiceEntity } from '@/core/entity/service';
  import { randomInArray } from '@/core/utils/random';
  import { ImageEntity, ImageEntityId } from '@/core/entity/image';

  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiDialog from '@/app/ui-kit/UiDialog.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import UiMenu from '@/app/ui-kit/UiMenu.vue';


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
      UiResponsiveImage,
      UiMenu,
    },
  })
  export default class ServiceElementDialog extends Vue {

    public isEditing: boolean = false;

    private service: ServiceEntity = null;

    private readonly colors = colors;

    @Getter('images/emojis')
    public emojis: ImageEntity[];

    @Getter('images/logos')
    public logos: ImageEntity[];

    @Getter('images/getById')
    public getImageById: (id: ImageEntityId) => ImageEntity;

    public selectedImage: ImageEntity = null;

    @LazyInject(NotificationService)
    private notificationService: NotificationService;

    @Ref()
    public dialog: UiDialog;

    @Ref()
    public imageMenu: UiMenu;

    @Ref()
    public imageSelectButton: UiButton;

    @Ref()
    public nameField: UiInput;

    public imageSelectButtonEl: HTMLButtonElement = null;

    mounted() {
      this.imageSelectButtonEl = this.imageSelectButton.$el as HTMLButtonElement;
    }

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
      this.service = null;
      return { isEditing: this.isEditing, entity };
    }

    public show(service?: ServiceEntity) {
      this.isEditing = false;
      this.service = null;
      if (service) {
        this.service = service.clone();
        this.selectedImage = this.getImageById(this.service.pictureId);
        this.isEditing = true;
      } else {
        this.selectedImage = randomInArray(this.emojis);
        this.service = new ServiceEntity({
          id: null,
          color: randomInArray(this.colors),
          name: '',
          pictureId: this.selectedImage.id,
        });
      }

      this.dialog.show();

      if (!this.isEditing) {
        setTimeout(() => (this.nameField.$el as HTMLInputElement).focus(), 50);
      }
    }

    public onImageSelect(image: ImageEntity) {
      this.selectedImage = image;
      this.service.pictureId = this.selectedImage.id;
      this.imageMenu.close();
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

    &__image {
      $size: $grid-step * 6;
      width: $size;
      height: $size;
    }

    &__image-menu {
      @include UiPadding(xs);
      max-height: 100%;
      max-width: $grid-step * 80;
      overflow: auto;
      z-index: 100000;
    }

    &__image-menu-heading {
      @include UiTypographyBody2();
      @include UiMargin(sm, bottom);
      @include UiPadding(sm, top);
    }

  }
</style>
