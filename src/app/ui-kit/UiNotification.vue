<template>
  <div class="ui-notification" :class="[typeClass]">
    <p class="ui-notification__text">{{params.text}}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { NotificationParams } from '@/core/service/notification/notification.service';


  /**
   * @class UiNotification
   * @extends Vue
   * @public
   */
  @Component
  export default class UiNotification extends Vue {

    private static readonly defaultType = 'error';

    @Prop() params?: NotificationParams;

    get typeClass(): string {
      const type = (this.params && this.params.type) || UiNotification.defaultType;
      return `ui-notification_type-${type}`;
    }

  }
</script>

<style scoped lang="scss">
  .ui-notification {
    @include UiBorderRadius(md);
    @include UiMargin(xxs, bottom);
    @include UiPadding(sm);
    display: flex;
    align-items: center;
    min-height: $grid-step * 10;
    box-shadow: UiShadow(1);

    animation-timing-function: ease-in-out;
    animation-name: ui-notification-frames-in;
    animation-duration: 100ms;

    &_type-error {
      @include UiTheme() {
        background-color: UiColor(negative-light);
        color: UiColor(negative-dark);
      }
    }

    &_type-info {
      @include UiTheme() {
        background-color: UiColor(neutral-light);
        color: UiColor(neutral-dark);
      }
    }

    &__text {
      @include UiTypographyBodyMid();
    }
  }

  @keyframes ui-notification-frames-in {
    0% {
      transform: scale(0.7);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
