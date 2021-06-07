/* eslint-disable no-console */
import { UserEntity } from '@/core/entity/user';
import { TrackerService } from './tracker.service';


const DEV_TRACKER_TOKEN = '[DevTrackerServiceImpl]';
const SETUP_MESSAGE = '[DevTrackerServiceImpl] development tracker has been successfully initialized. Verify this message does not appear in production';


export class DevTrackerServiceImpl extends TrackerService {

  public constructor() {
    super();
    this.print(SETUP_MESSAGE);
  }

  public event(category: string, name: string) {
    this.print(`${DEV_TRACKER_TOKEN} category: ${category}, event: ${name}`);
  }

  public pageView(page: string) {
    this.print(`${DEV_TRACKER_TOKEN} pageView: ${page}`);
  }

  public setUser(user: UserEntity) {
    this.print(`${DEV_TRACKER_TOKEN} setUser: ${user.id}`);
  }

  private print(str: string) {
    const styles = 'color: lightblue; background-color: black; display: inline-block; padding: 4px;';
    console.log(`%c${str}`, styles);
  }

}
