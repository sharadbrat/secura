<template>
  <div
    ref="backdrop"
    class="ui-overlay ui-dialog-wrapper"
    :class="{
      'ui-dialog-wrapper_is-active': isActive,
      'ui-dialog-wrapper_is-mobile-bottom-sheet': isBottomSheetOnMobile
    }"
    @click="onBackdropClick($event)"
  >
    <div
      class="ui-dialog"
      :class="[
        {
          'ui-dialog_is-full-height': isFullHeight,
          'ui-dialog_is-mobile-bottom-sheet': isBottomSheetOnMobile
        },
        sizeClass,
      ]"
      role="dialog"
    >
      <div v-if="isHeaderShown" class="ui-dialog__header">
        <slot name="header">
          <h3 class="ui-dialog__heading">{{title}}</h3>
        </slot>
      </div>

      <div v-if="isBodyShown" class="ui-dialog__body">
        <slot name="body">
          {{text}}
        </slot>
      </div>

      <div v-if="isFooterShown" class="ui-dialog__footer">
        <slot name="footer">
          <UiButton
            type="secondary"
            size="sm"
            v-if="isSecondaryButtonShown"
            :disabled="isSecondaryButtonDisabled"
            @click="onSecondaryButtonClick"
          >
            {{secondaryButtonText}}
          </UiButton>

          <UiButton
            class="ui-dialog__button-primary"
            type="primary"
            size="sm"
            v-if="isPrimaryButtonShown"
            :disabled="isPrimaryButtonDisabled"
            @click="onPrimaryButtonClick"
          >
            {{primaryButtonText}}
          </UiButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component, Prop, Emit, Ref,
  } from 'vue-property-decorator';

  import UiButton from '@/app/ui-kit/UiButton.vue';

  export type UiDialogSize = 'sm' | 'md' | 'lg';

  /**
   * @class UiDialog
   * @extends Vue
   * @public
   */
  @Component({
    components: {
      UiButton,
    },
  })
  export default class UiDialog extends Vue {

    @Prop() public text?: string;

    @Prop() public title?: string;

    @Prop() public isFullHeight?: boolean;

    @Prop({ default: true }) public isSecondaryButtonShown?: boolean;

    @Prop({ default: true }) public isPrimaryButtonShown?: boolean;

    @Prop({ default: true }) public shouldCloseOnSecondaryButtonClick?: boolean;

    @Prop({ default: true }) public shouldCloseOnPrimaryButtonClick?: boolean;

    @Prop({ default: 'Cancel' }) public secondaryButtonText?: string;

    @Prop({ default: 'Ok' }) public primaryButtonText?: string;

    @Prop({ default: 'md' }) public size?: UiDialogSize;

    @Prop({ default: false }) public isSecondaryButtonDisabled?: boolean;

    @Prop({ default: false }) public isPrimaryButtonDisabled?: boolean;

    @Prop({ default: true }) public isBackdropClickEnabled?: boolean;

    @Prop({ default: true }) public isBottomSheetOnMobile?: boolean;

    @Ref('backdrop') public backdropElement: HTMLDivElement;

    public isActive: boolean = false;

    public show() {
      this.isActive = true;
    }

    public hide() {
      this.isActive = false;
    }

    public get sizeClass(): string {
      return `ui-dialog_size-${this.size}`;
    }

    public get isHeaderShown(): boolean {
      return Boolean(this.$slots.header || this.title);
    }

    public get isBodyShown(): boolean {
      return Boolean(this.$slots.body || this.text);
    }

    public get isFooterShown(): boolean {
      const isAnyButtonEnabled = this.isSecondaryButtonShown || this.isPrimaryButtonShown;
      return Boolean(this.$slots.footer || isAnyButtonEnabled);
    }

    public onBackdropClick(event: MouseEvent) {
      if (!this.isBackdropClickEnabled) {
        return;
      }

      if (event.target !== this.backdropElement) {
        return;
      }

      this.hide();
    }

    @Emit('secondary-button-click')
    public onSecondaryButtonClick() {
      if (this.shouldCloseOnSecondaryButtonClick) {
        this.hide();
      }
    }

    @Emit('primary-button-click')
    public onPrimaryButtonClick() {
      if (this.shouldCloseOnPrimaryButtonClick) {
        this.hide();
      }
    }

  }
</script>

<style scoped lang="scss">
  .ui-dialog-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    overflow: auto;

    opacity: 0;
    visibility: hidden;

    transition: opacity linear 100ms, visibility linear 100ms;
    will-change: opacity, visibility;

    &_is-mobile-bottom-sheet {
      @include UiMediaMobile() {
        justify-content: flex-end;
      }
    }

    &_is-active {
      opacity: 1;
      visibility: visible;

      .ui-dialog {
        transform: translateY(0);
        animation-name: UiDialogSlideOut;
      }
    }
  }

  .ui-dialog {
    @include UiBorderRadius(lg);

    display: flex;
    flex-direction: column;

    max-height: 85vh;
    max-width: 98vw;
    transform-origin: bottom;

    animation-fill-mode: both;
    animation-duration: 400ms;
    animation-delay: 50ms;
    animation-timing-function: ease;

    box-shadow: UiShadow(1);
    @include UiTheme() {
      background-color: UiColor(shade-100);
    }

    &_size-sm {
      width: $grid-step * 100; // 400px
    }

    &_size-md {
      width: $grid-step * 125; // 500px
    }

    &_size-lg {
      width: $grid-step * 175; // 700px
    }

    &_is-full-height {
      height: 100%;
    }

    &_is-mobile-bottom-sheet {
      @include UiMediaMobile() {
        max-width: 100vw;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }


    &__header {
      @include UiPadding(md);
      @include UiPadding(xs, bottom);
      display: flex;
      align-items: center;
      flex-shrink: 0;
      // border-bottom: 1px solid UiColor(shade-500);
    }

    &__heading {
      @include UiTypographyHeading4();
    }

    &__body {
      @include UiPadding(md, left);
      @include UiPadding(md, right);
      @include UiPadding(xs, top);
      @include UiPadding(xs, bottom);
      flex-grow: 1;
      overflow: auto;
    }

    &__footer {
      @include UiPadding(md);
      @include UiPadding(xs, top);

      display: flex;
      justify-content: flex-end;
      flex-shrink: 0;
    }

    &__button-primary {
      @include UiMargin(sm, left);
    }

  }

  @keyframes UiDialogSlideOut {
    0% {
      opacity: 0;
      transform: translateY($grid-step * 40) scale(1, 1);
    }

    50% {
      opacity: 1;
      transform: translateY(0) scale(1, 1.025);
    }

    100% {
      transform: translateY(0) scale(1, 1);
    }
  }
</style>
