<template>
  <div class="notification-presenter">
    <UiNotification
      v-for="notification in notifications"
      :key="notification.key"
      :params="notification"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { NotificationService, NotificationParams } from '@/core/service/notification/notification.service';
  import UiNotification from '@/app/ui-kit/UiNotification.vue';
  import { generateUUID } from '@/core/utils/generate-uuid';


  /**
   * @interface NotificationsPresenterNotificationParams
   * @extends NotificationParams
   * @private
   */
  interface NotificationsPresenterNotificationParams extends NotificationParams {
    key: string;
  }


  /**
   * @class NotificationPresenter
   * @extends Vue
   * @public
   */
  @Component({
    components: { UiNotification },
  })
  export default class NotificationPresenter extends Vue {

    private static readonly displayTime = 10000;

    @LazyInject(NotificationService)
    private notificationService: NotificationService;

    private unsubscribeFromNotifications?: Function;

    private notificationHideTimeouts: number[] = [];

    private notifications: NotificationsPresenterNotificationParams[] = [];

    /**
     * Initialize notification subscription.
     * @method created
     * @protected
     */
    protected created() {
      const notificationHandler = this.onNotificationReceive.bind(this);
      const unsubscribeFunction = this.notificationService.subscribe(notificationHandler);
      this.unsubscribeFromNotifications = unsubscribeFunction;
    }

    /**
     * Cleanup notification subscription and timeouts.
     * @method destroyed
     * @protected
     */
    protected destroyed() {
      if (this.unsubscribeFromNotifications) {
        this.unsubscribeFromNotifications();
      }
      this.notificationHideTimeouts.forEach(el => clearTimeout(el));
    }

    /**
     * @method onNotificationReceive
     * @private
     */
    private onNotificationReceive(params: NotificationParams) {
      const key = generateUUID();
      this.notifications.push({ ...params, key });

      const timeout = setTimeout(() => {
        const filtered = this.notifications.filter(el => el.key !== key);
        this.notifications = filtered;
      }, NotificationPresenter.displayTime);

      this.notificationHideTimeouts.push(timeout);
    }

  }
</script>

<style scoped lang="scss">
  .notification-presenter {
    @include UiMargin(xl, top);
    @include UiLayout(
      map_get($grid-spacing, md),
      map_get($grid-spacing-mobile, md),
      $content-max-width-small,
    );

    position: fixed;
    z-index: 2000;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>
