export function $for_each<T, K>(collection: T[], renderFunc: (element: T, elementIndex: number) => K): K[] {
  return collection.map((element, elemIdx) => renderFunc(element, elemIdx));
}
