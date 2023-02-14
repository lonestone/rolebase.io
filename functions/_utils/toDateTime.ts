export const toDateTime = (secs: number): Date => {
  const t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}
