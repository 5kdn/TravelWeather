#!/usr/bin/env node
import {describe, expect, it } from 'vitest'
import { convWMOCode2String } from '@/utils/weather'

describe('convWMOCode2String()のテスト', () => {
  it.each([
    [0, 'Fine'],
    [1, 'Cloudy'],
    [2, 'Cloudy'],
    [3, 'Cloudy'],
    [45, 'Foggy'],
    [48, 'Foggy'],
    [51, 'Drizzle'],
    [53, 'Drizzle'],
    [55, 'Drizzle'],
    [56, 'FreezingDrizzle'],
    [57, 'FreezingDrizzle'],
    [61, 'Rainy'],
    [63, 'Rainy'],
    [65, 'Rainy'],
    [66, 'FreezingRain'],
    [67, 'FreezingRain'],
    [71, 'Snowy'],
    [73, 'Snowy'],
    [75, 'Snowy'],
    [77, 'Snowy'],
    [80, 'RainShower'],
    [81, 'RainShower'],
    [82, 'RainShower'],
    [85, 'SnowShower'],
    [86, 'SnowShower'],
    [95, 'Thunderstorm'],
    [96, 'Thunderstorm'],
    [99, 'Thunderstorm'],
    [null, 'NA'],
    [100, 'NA']
  ])('成功 (%i -> %s)', (code, expected)=>{
    let actual = convWMOCode2String(code)
    expect(actual).toBe(expected)
  })

  it('例外処理', () => {
    // 定義済み引数
    const arr = [0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99]

    for (let code = -1; code <= 100; code++) {
      if(arr.includes(code)) continue
      let actual = convWMOCode2String(code)
      expect(actual).toBe('NA')
    }
  })
})
