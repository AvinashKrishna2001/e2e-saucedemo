type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function write(level: LogLevel, message: string, details?: unknown): void {
  const timestamp = new Date().toISOString();
  const suffix = details === undefined ? '' : ` ${JSON.stringify(details)}`;
  const line = `[${timestamp}] [${level}] ${message}${suffix}`;
  if (level === 'ERROR') console.error(line);
  else if (level === 'WARN') console.warn(line);
  else console.log(line);
}

export const logger = {
  info: (message: string, details?: unknown): void => write('INFO', message, details),
  warn: (message: string, details?: unknown): void => write('WARN', message, details),
  error: (message: string, details?: unknown): void => write('ERROR', message, details),
};
