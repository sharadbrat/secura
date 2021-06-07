import { UserEntity } from '@/core/entity/user';
import { injectable } from 'inversify';


@injectable()
export abstract class TrackerService {

  /**
   * List of all categories for tracker events.
   * @property {Object} E_CAT
   * @readonly
   * @static
   * @public
   */
  public static readonly E_CAT = {
    GENERAL: 'general',
    AUTH: 'auth',
  };

  /**
   * List of all event names
   * @property {Object} E_NAME
   * @readonly
   * @static
   * @public
   */
  public static readonly E_NAME = {
    LOGIN: 'login',
    LOGOUT: 'logout',
  };

  public abstract event(category: string, name: string): void;

  public abstract pageView(page: string): void;

  public abstract setUser(user: UserEntity): void;

}
