export function $if_not<T>(condition: unknown, output: T): T | null {
  return !condition ? output : null;
}
