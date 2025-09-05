/**
 * Number utility functions
 */

/**
 * Round a number to 2 decimal places (cents)
 * @param value - The number to round
 * @returns The number rounded to 2 decimal places
 */
export function roundToCents(value: number): number {
  return Number(value.toFixed(2));
}
