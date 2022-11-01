import { cutDecimals } from './cutDecimals';

export function formatNumber(x: number | string, maxDecimals = 8): string {
  const resultNumber = cutDecimals(x, maxDecimals);

  const pointIdx = resultNumber.indexOf('.');
  const units = pointIdx === -1 ? resultNumber : resultNumber.substring(0, pointIdx);
  const decimals = pointIdx === -1 ? '' : resultNumber.substring(pointIdx, pointIdx + maxDecimals + 1);

  const formattedUnits = units.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedUnits}${decimals}`;
}
