// Memoize a function result
// Results are cached in a Map forever

export function memoize<Args extends any[], Result>(
  fn: (...args: Args) => Result
) {
  const map = new Map<string, Result>()

  const memoized = (...args: Args): Result => {
    const key = args.join('|')
    if (map.has(key)) {
      const result = map.get(key)
      if (result) {
        return result
      }
    }
    const result = fn(...args)
    map.set(key, result)
    return result
  }
  return memoized
}
