export const logger = {
  log: (...args: any[]) => console.log(`[LEARN]: ${args[0]}`, ...args),
  warn: (...args: any[]) => console.warn(`[LEARN]: ${args[0]}`, ...args),
  error: (...args: any[]) => console.error(`[LEARN]: ${args[0]}`, ...args),
};
