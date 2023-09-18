export const dateFromSeconds = (secs: number): Date => {
  return new Date(secs * 1000)
}
