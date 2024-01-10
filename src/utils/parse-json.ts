export function parseJson<T>(json: string) {
  return JSON.parse(json) as T;
}
