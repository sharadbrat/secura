import { TrackerService } from '@/core/service/tracker/tracker.service';
import { NotificationService } from '@/core/service/notification/notification.service';
import Vue from 'vue';

import { LazyInject } from '@/core/ioc';
import { OauthToken, UserAuthToken } from '@/core/repository/user/user.repository';
import { PersistenceService } from '@/core/service/persistence/persistence.service';
import { OauthUseCase } from '@/core/use-case/user/oauth.use-case';


export class AuthView extends Vue {

  @LazyInject(PersistenceService)
  public persistenceService: PersistenceService;

  @LazyInject(OauthUseCase)
  public oauthUseCase: OauthUseCase;

  @LazyInject(NotificationService)
  public notificationService: NotificationService;

  @LazyInject(TrackerService)
  public tracker: TrackerService;

  public isAuthInProgress: boolean = false;

  public areCredentialsValid: boolean = false;

  public displayErrorMessage(error: Error) {
    this.notificationService.showErrors([error]);
  }

  public onOauthFailure(provider: string) {
    this.onAuthFailure(new Error(`Could not authorize with ${provider}`));
  }

  public onOauthSuccess(oauthToken: OauthToken) {
    this.oauthUseCase.perform(oauthToken)
      .then(token => this.onAuthEnd(token))
      .catch(error => this.onAuthFailure(error));
  }

  public onAuthStart() {
    this.isAuthInProgress = true;
  }

  public onAuthEnd(token: UserAuthToken) {
    this.persistenceService.storeValue(PersistenceService.VALUE_NAME.TOKEN, token);
    this.$router.push('/');
    this.isAuthInProgress = false;
  }

  public onAuthFailure(error: Error) {
    this.isAuthInProgress = false;
    this.displayErrorMessage(error);
  }

}
