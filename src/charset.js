export const numbers    = '0123456789';
export const charsLower = 'abcdefghijklmnopqrstuvwxyz';
export const charsUpper = charsLower.toUpperCase();
export const hexChars   = 'abcdef';

export function getCharset(type) {
  if (type === 'alphanumeric') return numbers + charsLower + charsUpper;
  if (type === 'numeric') return numbers;
  if (type === 'alphabetic') return charsLower + charsUpper;
  if (type === 'hex') return numbers + hexChars;

  // Customized charset
  const chars = {};
  const len = type.length;
  for (let i = 0; i < len; ++i) chars[type[i]] = true;
  return Object.keys(chars).sort().join('');
}
