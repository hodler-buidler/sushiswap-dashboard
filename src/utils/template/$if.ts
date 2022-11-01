export function $if<T>(condition: unknown, output: T): T | null {
  return condition ? output : null;
}
