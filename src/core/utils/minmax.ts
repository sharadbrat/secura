/**
 * Receives `v` in range `[min, max]` and returnes proportional value in range `[newMin, newMax]`.
 * @function minmax
 * @param {number} v
 * @param {number} min
 * @param {number} max
 * @param {number} newMin
 * @param {number} newMax
 * @public
 */
export function minmax(v: number, min: number, max: number, newMin: number, newMax: number): number {
  return (v - min) / (max - min) * (newMax - newMin) + newMin;
}
