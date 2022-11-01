export function randomInt(min = 0, max = Number.MAX_SAFE_INTEGER): number {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
