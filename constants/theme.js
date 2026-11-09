import { Platform } from 'react-native';

export const COLORS = {
  green: '#495E57',
  yellow: '#F4CE14',
  cream: '#EDEFEE',
  white: '#FFFFFF',
  text: '#333333',
  muted: '#6B6B6B',
  border: '#D9D9D9',
  disabled: '#CDCDCD',
  separator: '#E5E5E5',
};

export const HEADING_FONT = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia, serif',
});
