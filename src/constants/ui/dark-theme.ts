const PRIMARY_FONT = '\'DM Sans\', sans-serif';

export const DARK_THEME = {
  typography: {
    fontFamily: PRIMARY_FONT,
    fontSize: '14px',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    lineHeight: '18px',
    base: {
      fontFamily: PRIMARY_FONT,
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '18px',
    },
    h1: {
      fontFamily: PRIMARY_FONT,
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1,
    },
    h3: {
      fontFamily: PRIMARY_FONT,
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 1,
    },
    h5: {
      fontFamily: PRIMARY_FONT,
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '18px',
    },
  },
  palette: {
    primary: {
      main: '#5294FF',
    },
    grey: {
      100: '#8D97A0',
    },
    bg: {
      default: '#000000',
    },
    text: {
      primary: '#DCDCDC',
      secondary: '#646464',
    },
    border: {
      main: '#212121',
    },
    skeleton: {
      base: '#373A47',
      highlight: '#9293A6',
    }
  },
  size: {
    borderRadius: {
      main: '12px',
    },
  }
};
