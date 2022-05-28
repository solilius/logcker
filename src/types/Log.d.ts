export enum LogLevel {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export type Log = {
  origin: string;
  timestamp: number;
  level: LogLevel;
  data: string;
}