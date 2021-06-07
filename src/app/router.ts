import Vue from 'vue';
import Router, { Route } from 'vue-router';

import { LazyInject } from '@/core/ioc';
import { AuthenticatedRouteGuard } from '@/core/service/guard/authenticated-route.guard';
import { UnauthenticatedRouteGuard } from '@/core/service/guard/unauthenticated-route.guard';
import { TrackerService } from '@/core/service/tracker/tracker.service';

import PassThrough from '@/app/components/PassThrough.vue';
import RegistrationView from '@/app/views/registration/RegistrationView.vue';
import LoginView from '@/app/views/login/LoginView.vue';
import ForgotPasswordView from '@/app/views/forgot-password/ForgotPasswordView.vue';

import MainView from '@/app/views/main/MainView.vue';

export class ApplicationRouter {

  private router: Router;

  public constructor() {
    Vue.use(Router);

    this.router = this.createRouter();
  }

  @LazyInject(AuthenticatedRouteGuard)
  private authenticatedRouteGuard: AuthenticatedRouteGuard;

  @LazyInject(UnauthenticatedRouteGuard)
  private unauthenticatedRouteGuard: UnauthenticatedRouteGuard;

  @LazyInject(TrackerService)
  private tracker: TrackerService;

  public getRouter() {
    return this.router;
  }

  private createRouter(): Router {
    const router = new Router({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: [
        {
          path: '',
          component: PassThrough,
          // REVIEW: uncomment this line to enable auth guard
          // beforeEnter: this.authenticatedRouteGuard.doGuard,
          children: [
            {
              path: '',
              name: 'main',
              component: MainView,
            },
          ],
        },

        // routes for unauthenticated user
        {
          path: '/registration',
          name: 'registration',
          // REVIEW: uncomment this line to enable auth guard
          // beforeEnter: this.unauthenticatedRouteGuard.doGuard,
          component: RegistrationView,
        },
        {
          path: '/login',
          name: 'login',
          // REVIEW: uncomment this line to enable auth guard
          // beforeEnter: this.unauthenticatedRouteGuard.doGuard,
          component: LoginView,
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          // REVIEW: uncomment this line to enable auth guard
          // beforeEnter: this.unauthenticatedRouteGuard.doGuard,
          component: ForgotPasswordView,
        },


        // redirect to app by default
        {
          path: '*',
          redirect: '/',
        },
      ],
    });

    router.afterEach((to, from) => this.onRouteChange(to, from));

    return router;
  }

  private onRouteChange(to: Route, from: Route) {
    if (!to.name || to.name === from.name) {
      return;
    }

    this.tracker.pageView(to.name);
  }

}
