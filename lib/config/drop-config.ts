export type DropMode = 'pre-drop' | 'live' | 'sold-out';

export interface DropConfig {
  mode: DropMode;
  dropDate: Date | null;
  isShopEnabled: boolean;
  showWaitlist: boolean;
  showCountdown: boolean;
}

export function getDropConfig(): DropConfig {
  const mode = (process.env.NEXT_PUBLIC_DROP_MODE || 'pre-drop') as DropMode;
  const dropDateStr = process.env.NEXT_PUBLIC_DROP_DATE;
  const dropDate = dropDateStr ? new Date(dropDateStr) : null;

  const configs: Record<DropMode, DropConfig> = {
    'pre-drop': {
      mode: 'pre-drop',
      dropDate,
      isShopEnabled: false,
      showWaitlist: true,
      showCountdown: true,
    },
    'live': {
      mode: 'live',
      dropDate,
      isShopEnabled: true,
      showWaitlist: false,
      showCountdown: false,
    },
    'sold-out': {
      mode: 'sold-out',
      dropDate: null,
      isShopEnabled: false,
      showWaitlist: true,
      showCountdown: false,
    },
  };

  return configs[mode];
}

export function formatDropDate(date: Date | null): string {
  if (!date) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}
