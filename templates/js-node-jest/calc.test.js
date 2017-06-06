import { sum, substract } from './calc'

describe('calculator', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('substract 2 - 1 to equal 1', () => {
    expect(substract(2, 1)).toBe(1)
  })
})

describe('calculator', () => {
  test('array', () => {
    // toBeArray is delivered by jasmine-expect
    expect([1, 3, 4, 5]).toBeArray()
  })
})
