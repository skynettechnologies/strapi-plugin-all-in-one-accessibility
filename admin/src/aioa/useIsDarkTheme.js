import { useTheme } from 'styled-components';

/** True when a hex colour is dark */
const isDarkHex = (hex) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const luminance = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luminance < 0.5;
};

/**
 * Follows the theme chosen in Strapi (Light / Dark / System): Strapi's design system theme
 * has colors.neutral0 = #ffffff (light) or #212134 (dark). Falls back to the OS preference.
 */
export const useIsDarkTheme = () => {
  const theme = useTheme();
  const fromTheme = isDarkHex(theme?.colors?.neutral0);
  if (fromTheme !== null) return fromTheme;
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
};
