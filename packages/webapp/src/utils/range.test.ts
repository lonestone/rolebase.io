import { describe, expect, it } from 'vitest'
import { range } from './range'

describe('range', () => {
  it('3 to 5', () => {
    expect(range(3, 5)).toEqual([3, 4, 5])
  })
})
