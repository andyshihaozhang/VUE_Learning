/**
 * Deep clone an object using JSON.
 * @param obj - The object to be cloned.
 */
export function jsonClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
} 