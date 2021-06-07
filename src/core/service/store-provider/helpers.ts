/**
 * If there is an item with given `id` in array, replace it. Otherwise - push.
 * In both cases creates new array.
 * @function pushOrEdit<T>
 * @param {T[]} array
 * @param {string} id
 * @param {T} value
 * @returns {T[]}
 */
export function pushOrEdit<T extends object>(array: T[], id: string, value: T): T[] {
  const index = array.findIndex(el => el[id] === value[id]);
  if (index !== -1) {
    const copy = [...array];
    copy[index] = value;
    return copy;
  }

  return [...array, value];
}
