export function cutDecimals(value: string | number, maxDecimals: number): string {
  const examinedValue = String(value);

  if (examinedValue.includes('.')) {
    const pointIdx = examinedValue.indexOf('.');

    const units = examinedValue.substring(0, pointIdx);
    const decimals = examinedValue.substring(pointIdx, pointIdx + maxDecimals + 1);

    return `${units}${maxDecimals ? decimals : ''}`;
  }

  return examinedValue;
}
