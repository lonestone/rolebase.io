export const dateFromSeconds = (secs: number): string => {
  return new Date(secs * 1000).toISOString()
}
