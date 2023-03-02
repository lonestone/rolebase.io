// Source: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj

export function shuffleArray<T>(array: T[]) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}
