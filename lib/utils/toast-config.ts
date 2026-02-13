import { toast as hotToast } from 'react-hot-toast';

const baseStyle = {
  fontFamily: 'Space Mono, monospace',
  fontSize: '14px',
};

const successStyle = {
  ...baseStyle,
  background: 'var(--bagel-tan)',
  color: 'var(--true-black)',
  fontWeight: 'bold',
};

const errorStyle = {
  ...baseStyle,
  background: 'var(--true-black)',
  color: 'var(--true-white)',
};

export const toast = {
  success: (message: string) => hotToast.success(message, { style: successStyle }),
  error: (message: string) => hotToast.error(message, { style: errorStyle }),
};
