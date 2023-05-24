const palette = {
  gray: '#57575a',
  licorice: '#2b1c1e',
  black: '#000',
  vermillion: '#f04d44',
  jet: '#312f30',
  umber: '#88342f',
  white: '#fff',
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.licorice,
    primary: palette.jet,
    highlight: palette.vermillion,
  },

  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },

  textVariants: {
    header: {
      fontSize: 36,
      fontWeight: 'bold',
    },
  },
};

import {createContext} from 'react';
const ThemeContext = createContext({theme});
export default ThemeContext;
