import type {CommonColors} from '@mui/material/styles';

import type {PaletteColorNoChannels} from './core/palette';
import type {ThemeCssVariables} from './types';

// ----------------------------------------------------------------------

export type PaletteConfig = Record<
  'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
  PaletteColorNoChannels
> & {
  common: Pick<CommonColors, 'black' | 'white'>;
  grey: Record<
    | '50'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
    string
  >;
};

export const lightPalette = {
  primary: {
    lighter: '#D0ECFE',
    light: '#73BAFB',
    main: '#1877F2',
    dark: '#0C44AE',
    darker: '#042174',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF',
  },
  info: {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#D3FCD2',
    light: '#77ED8B',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
    contrastText: '#ffffff',
  },
  warning: {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: '#1C252E',
  },
  error: {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
  },
  grey: {
    '50': '#FCFDFD',
    '100': '#F9FAFB',
    '200': '#F4F6F8',
    '300': '#DFE3E8',
    '400': '#C4CDD5',
    '500': '#919EAB',
    '600': '#637381',
    '700': '#454F5B',
    '800': '#1C252E',
    '900': '#141A21',
  },
  common: {black: '#000000', white: '#FFFFFF'},
};

// Sensible dark palette based on current light palette and MUI dark best practices
export const darkPalette = {
  primary: {
    lighter: '#A6C8FF',
    light: '#5B9BFF',
    main: '#1877F2',
    dark: '#0C44AE',
    darker: '#042174',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#D1B3FF',
    light: '#A66CFF',
    main: '#8E33FF',
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF',
  },
  info: {
    lighter: '#6FE7F7',
    light: '#00B8D9',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#7EE787',
    light: '#22C55E',
    main: '#22C55E',
    dark: '#118D57',
    darker: '#065E49',
    contrastText: '#FFFFFF',
  },
  warning: {
    lighter: '#FFD666',
    light: '#FFAB00',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: '#1C252E',
  },
  error: {
    lighter: '#FFAC82',
    light: '#FF5630',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
  },
  grey: {
    '50': '#181A20',
    '100': '#23272F',
    '200': '#2C313A',
    '300': '#353B45',
    '400': '#444B58',
    '500': '#5C6370',
    '600': '#6C757E',
    '700': '#7C838C',
    '800': '#B2B7BE',
    '900': '#F4F6F8',
  },
  common: {black: '#000000', white: '#FFFFFF'},
};

type ThemeConfig = {
  classesPrefix: string;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  lightPalette: PaletteConfig;
  darkPalette: PaletteConfig;
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'DM Sans Variable',
    secondary: 'Geist Mono',
  },
  /** **************************************
   * Palette
   *************************************** */
  lightPalette: lightPalette,
  darkPalette: darkPalette,
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
