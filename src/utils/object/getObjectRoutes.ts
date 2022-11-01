import { isObject } from './isObject';

export function getObjectRoutes(obj: Record<string | number, any>, prefix = '', separator = '-'): [string[], any[]] {
  const keys = Object.keys(obj);
  const pathPrefix = prefix ? prefix + separator : '';

  return keys.reduce(([paths, values]: any, key) => {
    const entity = obj[key];
    let currentPaths: string[] = paths || [];
    let currentValues: any[] = values || [];

    if (isObject(entity)) {
      const [entityPaths, entityValues] = getObjectRoutes(entity, pathPrefix + key);

      if (entityValues) {
        currentPaths = currentPaths.concat(entityPaths);
        currentValues = [...currentValues, ...entityValues];
      }
    } else {
      currentPaths.push(pathPrefix + key);
      currentValues.push(entity);
    }

    return [currentPaths, currentValues];
  }, []);
}
