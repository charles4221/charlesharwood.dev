/**
 * Parse a JSON string into a JS object/array.
 * Literally just a wrapper around `JSON.parse` which allows us to pass a generic to type the return value.
 * This is useful as it allows us to avoid having to cast the return value of `JSON.parse` every time we use it.
 */
export function parseJson<T>(json: string) {
  return JSON.parse(json) as T;
}
