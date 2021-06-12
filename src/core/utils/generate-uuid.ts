import nanoid from 'nanoid';

/**
 * @function generateUUID
 * @param {number} length
 * @return {string}
 * @public
 */
export function generateUUID(length: number = 32): string {
  return nanoid(length);
}
