export function getTokenIcon(ticker: string): string {
  /* @ts-ignore */
  const images = require.context('../../assets/images/token-icons/', false, /\.(svg|png)$/);
  const imageName = ticker.toUpperCase();
  let image;
  try {
    image = images(`./${imageName}.svg`).default;
    return image;
  } catch (e) {
    return images('./default.png').default;
  }
}
