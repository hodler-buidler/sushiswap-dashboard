export function $if_else<T, K>(condition: unknown, trueOutput: T, falseOutput: K): T | K {
  return condition ? trueOutput : falseOutput;
}
