<template>
  <UiCard
    class="service-list-element"
    :style="{ 'border-left-color': service.color }"
  >
    <div class="service-list-element__heading-row">
      <UiResponsiveImage class="service-list-element__image"/>
      <h3 class="service-list-element__heading">{{service.name}}</h3>
    </div>
    <div class="service-list-element__input-row">

      <PasswordField
        class="service-list-element__input-container"
        readonly
        size="sm"
        :value="password"
        :isDisabled="isDisabled"
        :isShowDisabled="isShowDisabled"
      />

      <UiButton
        size="sm"
        type="subdued"
        width="shrink"
        ref="copyButton"
        :disabled="isDisabled"
      >
        <UiIcon name="copy"/>
      </UiButton>
    </div>

    <div class="service-list-element__bottom-row">
      <span class="service-list-element__id">{{service.id}}</span>
      <UiButton
        class="service-list-element__edit-button"
        size="sm"
        shape="circled"
        type="subdued"
        width="shrink"
        :disabled="!isEditable"
        @click="onEditClick()"
      >
        <UiIcon name="edit"/>
      </UiButton>
    </div>
  </UiCard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component, Emit, Prop, Ref,
  } from 'vue-property-decorator';
  import ClipboardJS from 'clipboard';

  import { ServiceEntity } from '@/core/entity/service';

  import UiCard from '@/app/ui-kit/UiCard.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import PasswordField from '@/app/components/PasswordField.vue';


  @Component({
    components: {
      UiCard,
      UiResponsiveImage,
      UiButton,
      UiInput,
      UiIcon,
      PasswordField,
    },
  })
  export default class ServiceListElement extends Vue {

    @Prop()
    public service: ServiceEntity;

    @Prop()
    public masterKey: string;

    @Prop({ default: false })
    public isEditable: boolean;

    @Prop({ default: false })
    public isDisabled: boolean;

    @Prop({ default: false })
    public isShowDisabled: boolean;

    @Ref()
    public copyButton: UiButton;

    private clipboardInstance: ClipboardJS;

    public get password(): string {
      if (!this.masterKey) {
        return '8800555353500000';
      }

      return this.service.getPassword(this.masterKey);
    }

    mounted() {
      this.clipboardInstance = new ClipboardJS(this.copyButton.$el, { text: () => this.password });
    }

    destroyed() {
      if (this.clipboardInstance) {
        this.clipboardInstance.destroy();
      }
    }

    @Emit('edit')
    public onEditClick(): ServiceEntity {
      return this.service;
    }

  }
</script>


<style scoped lang="scss">
  .service-list-element {

    @include UiPadding(sm);
    border-left: $grid-step * 3 solid;

    animation-fill-mode: forwards;
    animation-duration: 200ms;
    animation-name: ServiceElementFadeIn;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;

    &__input {
      max-width: $grid-step * 50; // 200px
    }

    &__input-container {
      @include UiMargin(xxs, right);
      position: relative;
      display: flex;
      align-items: center;
    }

    &__input-row {
      @include UiMargin(sm, bottom);
      display: flex;
      align-items: center;
    }

    &__heading {
      @include UiTypographyHeading4();
      word-break: break-word;
    }

    &__id {
      @include UiTypographyBodySmall();
      color: UiColor(shade-600);
      word-break: break-all;
    }

    &__heading-row {
      @include UiMargin(sm, bottom);
      display: flex;
      align-items: center
    }

    &__edit-button {
      @include UiMargin(xs, left);
      flex-shrink: 0;

      &:disabled {
        visibility: hidden;
      }
    }

    &__bottom-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__image {
      @include UiMargin(xxs, right);
      $size: $grid-step * 15;
      width: $size;
      height: $size;
      border-radius: $size / 2;
      flex-shrink: 0;
    }

    @keyframes ServiceElementFadeIn {
      0% {
        transform: rotateZ(-3deg) scale(0.95);
        opacity: 0;
      }

      100% {
        transform: rotateZ(0) scale(1);
        opacity: 1;
      }
    }
  }
</style>
