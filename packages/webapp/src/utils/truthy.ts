// Helper to use with filter
// eg: [1, 2, 0, null].filter(truthy) // number[]

export type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T

export function truthy<T>(value: T): value is Truthy<T> {
  return !!value
}
