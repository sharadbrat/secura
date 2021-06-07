/**
 * Creates an element and injects it into document's head tag.
 * @function injectElementInHead
 * @param {string} elementTag
 * @param {object} attributes
 * @returns {Promise}
 */
export function injectElementInHead(elementTag: string, attributes: object = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    const element = document.createElement(elementTag);
    Object.assign(element, attributes);
    element.addEventListener('load', resolve);
    element.addEventListener('error', reject);
    document.querySelector('head').appendChild(element);
  });
}


/**
 * @function injectScript
 * @param {string} src
 * @param {string} id
 * @return {Promise}
 * @public
 */
export function injectScript(src: string, id: string = null): Promise<any> {
  const options: any = {
    src,
    async: true,
  };
  if (id) {
    options.id = id;
  }
  return injectElementInHead('script', options);
}


/**
 * @function injectStyle
 * @param {string} href
 * @returns {Promise}
 */
export function injectStyle(href: string, id: string = null): Promise<any> {
  const options: any = {
    href,
    rel: 'stylesheet',
  };
  if (id) {
    options.id = id;
  }
  return injectElementInHead('link', options);
}
