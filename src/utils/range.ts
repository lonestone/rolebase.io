export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}
