import { generateUUID } from '@/core/utils/generate-uuid';
import { NotificationService, NotificationParams, NotificationSubscriber } from '@/core/service/notification/notification.service';


/**
 * @class NotificationServiceMapImpl
 * @extends NotificationService
 * @public
 */
export class NotificationServiceMapImpl extends NotificationService {

  private readonly defaultNotificationParams: NotificationParams = {
    text: 'Произошла ошибка. Разработчики уже осведомлены о проблеме.',
    type: 'error',
  };


  private subscriptionMap: { [id: string]: NotificationSubscriber } = {};


  public show(params: NotificationParams = this.defaultNotificationParams): boolean {
    const subscribers = Object.values(this.subscriptionMap);

    if (!subscribers.length) {
      throw new Error('There are no consumers for NotificationService');
    }

    subscribers.forEach(subscriber => subscriber(params));

    return true;
  }

  public showErrors(errors: Error[]): boolean {
    errors.forEach(el => this.show({
      text: el.message,
      type: 'error',
    }));

    return true;
  }


  public subscribe(subscriber: NotificationSubscriber): Function {
    const id = generateUUID();
    this.subscriptionMap[id] = subscriber;
    return () => {
      delete this.subscriptionMap[id];
    };
  }


  public clearConsumersMap(): boolean {
    this.subscriptionMap = {};
    return true;
  }

}
