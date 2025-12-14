export interface Countdown {
  id: string;
  title: string;
  targetDate: string; // ISO string format YYYY-MM-DD
  color: string;
}

export interface WidgetSettings {
  opacity: number;
  isLocked: boolean;
  theme: 'light' | 'dark';
}

export enum Tab {
  LIST = 'LIST',
  ADD = 'ADD',
  SETTINGS = 'SETTINGS',
  DEPLOY = 'DEPLOY'
}