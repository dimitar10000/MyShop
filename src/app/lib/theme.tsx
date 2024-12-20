'use client'
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    analogousColor: {
      green: {
        main: string,
        light: string,
        dark: string
      },
      purple: {
        main: string,
        light: string,
        dark: string
      }
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    analogousColor?: {
      green?: {
        main?: string,
        light?: string,
        dark?: string
      },
      purple?: {
        main?: string,
        light?: string,
        dark?: string
      }
    }
  }
}

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#94A3B8',
        light: '#b2bdce',
        dark: '#ced8e5',
        contrastText: '#f1ebde'
      },
      secondary: {
        main: '#b8a994',
        light: '#d6cbba',
        dark: '#524023',
        contrastText: '#283240'
      },
      background: {
        default: '#94A3B8'
      }
    },
    analogousColor: {
      green: {
        main: '#94b5b8',
        light: '#b2cbcd',
        dark: '#3d595c'
      },
      purple: {
        main: '#9794b8',
        light: '#c0bed5',
        dark: '#301f6c'
      }
    }
  },
  {
    cssVariables: true
  },
  {
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          .pac-container {
            z-index: 1500 !important;
          }
        `
      }
    }
  }
);