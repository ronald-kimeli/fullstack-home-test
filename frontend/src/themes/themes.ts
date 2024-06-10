import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    main?: string; 
    dark?: string; 
    steal?: string; 
  }

  interface PaletteColor {
    steal?: string; 
  }

  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor; 
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#5ACCCC', // Turquoise
    },
    secondary: {
      main: '#CFFAFA', // Turquoise light
      dark: '#28B8B8', // Turquoise dark 2
      steal: '#335C6E', // Steel Blue
    },
    text: {
      primary: '#335C6E', // Steel Blue
      secondary: '#FABD33', // Yellow
    },
    error: {
      main: '#F76434', // Orange Red
    },
    warning: {
      main: '#FAAD00', // Yellow Dark
    },
    info: {
      main: '#FFE6DC', // Orange Pastel
    },
    success: {
      main: '#4AA088', // Teal
    },
    background: {
      default: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: 'Mulish, sans-serif',
  },
});

export default theme;
