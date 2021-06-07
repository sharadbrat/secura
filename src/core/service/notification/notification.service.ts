import { injectable } from 'inversify';


/**
 * @type NotificationType
 * @public
 */
export type NotificationType = 'error' | 'info';


/**
 * @interface NotificationParams
 * @public
 */
export interface NotificationParams {
  text: string;
  type: NotificationType;
}


/**
 * @type NotificationConsumer
 * @public
 */
export type NotificationSubscriber = (NotificationParams) => any;


/**
 * @class NotificationService
 * @abstract
 * @public
 */
@injectable()
export abstract class NotificationService {

  /**
   * @method show
   * @param {NotificationParams} params
   * @public
   */
  public abstract show(params: NotificationParams): boolean;


  /**
   * @method showErrors
   * @param {Error[]} errors
   * @returns boolean
   * @public
   */
  public abstract showErrors(errors: Error[]): boolean;


  /**
   * Adds subscriber to subscriptionMap. Returns function, that removes subscription
   * from subscriptionMap when called.
   * @method subscribe
   * @param {NotificationSubscriber} subscriber
   * @public
   */
  public abstract subscribe(subscriber: NotificationSubscriber): Function;


  /**
   * @method clearConsumersMap
   * @public
   */
  public abstract clearConsumersMap(): boolean;

}
