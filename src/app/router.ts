import Vue from 'vue';
import Router, { Route } from 'vue-router';

import { LazyInject } from '@/core/ioc';
import { TrackerService } from '@/core/service/tracker/tracker.service';

import PassThrough from '@/app/components/PassThrough.vue';

import MainView from '@/app/views/main/MainView.vue';
import AboutView from '@/app/views/about/AboutView.vue';
import SettingsView from '@/app/views/settings/SettingsView.vue';

export class ApplicationRouter {

  private router: Router;

  public constructor() {
    Vue.use(Router);

    this.router = this.createRouter();
  }

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
          children: [
            {
              path: '',
              name: 'main',
              component: MainView,
            },
            {
              path: 'settings',
              name: 'settings',
              component: SettingsView,
            },
            {
              path: 'about',
              name: 'about',
              component: AboutView,
            },
          ],
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
