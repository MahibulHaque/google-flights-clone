import type {
  ColorSystemOptions,
  PaletteColor,
  PaletteColorChannel,
} from '@mui/material/styles';

import {createPaletteChannel, varAlpha} from '../utils.ts';

import {themeConfig} from '../theme-config';

import type {ThemeColorScheme} from '../types';

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../extend-theme-types.d.ts}
 */

// Keys for the palette colors
export type PaletteColorKey =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

// Palette color without additional channels
export type PaletteColorNoChannels = Omit<
  PaletteColor,
  'lighterChannel' | 'darkerChannel'
>;

// Palette color with additional channels
export type PaletteColorWithChannels = PaletteColor & PaletteColorChannel;

// Extended common colors
export type CommonColorsExtend = {
  whiteChannel: string;
  blackChannel: string;
};

// Extended text colors
export type TypeTextExtend = {
  disabledChannel: string;
};

// Extended background colors
export type TypeBackgroundExtend = {
  neutral: string;
  neutralChannel: string;
};

// Extended palette colors
export type PaletteColorExtend = {
  lighter: string;
  darker: string;
  lighterChannel: string;
  darkerChannel: string;
};

// Extended grey channels
export type GreyExtend = {
  '50Channel': string;
  '100Channel': string;
  '200Channel': string;
  '300Channel': string;
  '400Channel': string;
  '500Channel': string;
  '600Channel': string;
  '700Channel': string;
  '800Channel': string;
  '900Channel': string;
};

// ----------------------------------------------------------------------

// Primary color
export const primary = createPaletteChannel(themeConfig.lightPalette.primary);

// Secondary color
export const secondary = createPaletteChannel(
  themeConfig.lightPalette.secondary,
);

// Info color
export const info = createPaletteChannel(themeConfig.lightPalette.info);

// Success color
export const success = createPaletteChannel(themeConfig.lightPalette.success);

// Warning color
export const warning = createPaletteChannel(themeConfig.lightPalette.warning);

// Error color
export const error = createPaletteChannel(themeConfig.lightPalette.error);

// Common color
export const common = createPaletteChannel(themeConfig.lightPalette.common);

// Grey color
export const grey = createPaletteChannel(themeConfig.lightPalette.grey);

// Dark mode palette channels
export const primaryDark = createPaletteChannel(
  themeConfig.darkPalette.primary,
);
export const secondaryDark = createPaletteChannel(
  themeConfig.darkPalette.secondary,
);
export const infoDark = createPaletteChannel(themeConfig.darkPalette.info);
export const successDark = createPaletteChannel(
  themeConfig.darkPalette.success,
);
export const warningDark = createPaletteChannel(
  themeConfig.darkPalette.warning,
);
export const errorDark = createPaletteChannel(themeConfig.darkPalette.error);
export const commonDark = createPaletteChannel(themeConfig.darkPalette.common);
export const greyDark = createPaletteChannel(themeConfig.darkPalette.grey);

// Text color
export const text = {
  light: createPaletteChannel({
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
  }),
  dark: createPaletteChannel({
    primary: greyDark[900],
    secondary: greyDark[800],
    disabled: greyDark[700],
  }),
};

// Background color
export const background = {
  light: createPaletteChannel({
    paper: '#FFFFFF',
    default: grey[100],
    neutral: grey[200],
  }),
  dark: createPaletteChannel({
    paper: greyDark['50'],
    default: greyDark['100'],
    neutral: greyDark['200'],
  }),
};

// Base action color
export const baseAction = {
  hover: varAlpha(grey['500Channel'], 0.08),
  selected: varAlpha(grey['500Channel'], 0.16),
  focus: varAlpha(grey['500Channel'], 0.24),
  disabled: varAlpha(grey['500Channel'], 0.8),
  disabledBackground: varAlpha(grey['500Channel'], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

export const baseActionDark = {
  hover: varAlpha(greyDark['500Channel'], 0.08),
  selected: varAlpha(greyDark['500Channel'], 0.16),
  focus: varAlpha(greyDark['500Channel'], 0.24),
  disabled: varAlpha(greyDark['500Channel'], 0.8),
  disabledBackground: varAlpha(greyDark['500Channel'], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

// Action color
export const action = {
  light: {...baseAction, active: grey[600]},
  dark: {...baseActionDark, active: greyDark['400']},
};

// ----------------------------------------------------------------------

// Base palette
export const basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  common,
  grey,
  divider: varAlpha(grey['500Channel'], 0.2),
};

export const basePaletteDark = {
  primary: primaryDark,
  secondary: secondaryDark,
  info: infoDark,
  success: successDark,
  warning: warningDark,
  error: errorDark,
  common: commonDark,
  grey: greyDark,
  divider: varAlpha(greyDark['700Channel'], 0.24),
};

export const palette: Partial<
  Record<ThemeColorScheme, ColorSystemOptions['palette']>
> = {
  light: {
    ...basePalette,
    text: text.light,
    background: background.light,
    action: action.light,
  },
  dark: {
    ...basePaletteDark,
    text: text.dark,
    background: background.dark,
    action: action.dark,
  },
};
