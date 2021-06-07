import Randomizer from '@sharadbrat/randomizer';


/**
 * Picks random value from given array with equal probability.
 * @function randomInArray
 * @param {T[]} array
 * @public
 */
export function randomInArray<T>(array: T[]): T {
  if (!array || !array.length) {
    return null;
  }

  const r = new Randomizer(array.map(el => [1, el]));

  return r.choose();
}
