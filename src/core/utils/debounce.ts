/* eslint-disable no-multi-assign */
/* eslint-disable prefer-rest-params */

type FunctionType = (...args: any[]) => any;

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear'
 * that is a function which will clear the timer to prevent previously scheduled executions.
 *
 * @source https://github.com/component/debounce
 * @function debounce
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} isImmediate
 * @public
 */
export function debounce<T, F extends FunctionType>(
  func: F,
  wait: number,
  isImmediate?: boolean,
): FunctionType {
  let timeout: number;
  let args: IArguments;
  let context: any;
  let timestamp: number;
  let result: T;

  function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!isImmediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }

  const debounced = function debounced(this: any) {
    context = this;
    args = arguments;
    timestamp = Date.now();
    const callNow = isImmediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function clear() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = function flush() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
