/**
 * @function arrayToMap
 * @param {T} items
 * @param {string | number} key
 * @returns { { [key in string | number]: object } }
 */
export function arrayToMap<T>(items: T[], key: string): { [key in string]: T } {
  const result = {};
  items.forEach(item => result[item[key]] = item);
  return result;
}


/**
 * @function mapToArray
 * @param { { [key in string]: T } } map
 * @returns {T[]}
 */
export function mapToArray<T>(map: { [key in string]: T }): T[] {
  return Object.values(map);
}
