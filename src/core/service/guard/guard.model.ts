import { Route } from 'vue-router';

/**
 * @interface Guard
 * @public
 */
export interface Guard {
  doGuard(to: Route, from: Route, next: (pathOrAbort: string | object | boolean) => any): void;
}
