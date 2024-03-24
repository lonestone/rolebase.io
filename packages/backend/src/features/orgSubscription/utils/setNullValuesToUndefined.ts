type ReplaceNullByUndefined<T> = {
  [key in keyof T]: null extends T[key]
    ? Exclude<T[key], null> | undefined
    : T[key]
}

export function setNullValuesToUndefined<
  T extends Record<string, any>,
  R = ReplaceNullByUndefined<T>,
>(obj: T): R {
  const copy: any = { ...obj }
  for (const key in copy) {
    if (copy[key] === null) {
      copy[key] = undefined
    }
  }
  return copy
}
