/**
 * @function compareArrays
 * @param {any[]} a
 * @param {any[]} b
 * @returns {boolean}
 * @public
 */
export function compareArrays(a: any[], b: any[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  if (!a.every(el => b.includes(el))) {
    return false;
  }

  if (!b.every(el => a.includes(el))) {
    return false;
  }

  return true;
}
