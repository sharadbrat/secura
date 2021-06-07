/**
 * @function copyData
 * @param {T} value
 * @return {T}
 */
export function copyData<T extends object>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
