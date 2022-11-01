export function isObject(entity: unknown): entity is Record<string | number, unknown> {
  return typeof entity === 'object' && !Array.isArray(entity) && entity !== null
}
