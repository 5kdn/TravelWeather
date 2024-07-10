import { Coordinate } from '@/utils/coordinate'
import { HourlyWeather } from '@/utils/hourlyWeather'
import { Site } from '@/utils/site'
import { describe, expect, it } from 'vitest'

describe('initialize', () => {
  it.each([
    [
      null,   null, [] as HourlyWeather[],
      null,   null, [] as HourlyWeather[], null, null
    ],[
      'name', null, [] as HourlyWeather[],
      'name', null, [] as HourlyWeather[], null, null
    ],[
      null, new Coordinate(0, 0), [] as HourlyWeather[],
      null, new Coordinate(0, 0), [] as HourlyWeather[], null, null
    ],[
      null, null, [new HourlyWeather(new Date("2024-01-01T01:00:00.000Z"),null,null,null), new HourlyWeather(new Date("2024-01-01T02:00:00.000Z"),null,null,null)],
      null, null, [new HourlyWeather(new Date("2024-01-01T01:00:00.000Z"),null,null,null), new HourlyWeather(new Date("2024-01-01T02:00:00.000Z"),null,null,null)], new Date("2024-01-01T01:00:00.000Z"), new Date("2024-01-01T02:00:00.000Z")
    ],
  ])('(%s, %s, %s)', (
    name   , coordinate   , weather,
    expName, expCoordinate, expWeather, expBegin, expEnd
  ) => {
    const sw = new Site(name, coordinate, weather)
    expect(sw.siteName).toEqual(expName)
    expect(sw.coordinate).toEqual(expCoordinate)
    expect(sw.weathers).toEqual(expWeather)
    expect(sw.timeBegin).toEqual(expBegin)
    expect(sw.timeEnd).toEqual(expEnd)
  })
})

it('reenterable', () => {
  const sw = new Site(null, null)
  sw.siteName = "place A"
  sw.coordinate = new Coordinate(1.23, 2.34)
  const hw = [
    new HourlyWeather(new Date("2024-01-01T01:00:00.000Z"), "Fine", 12, 0.2),
    new HourlyWeather(new Date("2024-01-01T05:00:00.000Z"), "Fine", 12, 0.2),
    new HourlyWeather(new Date("2024-01-01T09:00:00.000Z"), "Fine", 12, 0.2),
  ]
  sw.weathers = hw

  expect(sw.siteName).toEqual('place A')
  expect(sw.coordinate).toEqual(new Coordinate(1.23, 2.34))
  expect(sw.timeBegin).toEqual(new Date("2024-01-01T01:00:00.000Z"))
  expect(sw.timeEnd).toEqual(new Date("2024-01-01T09:00:00.000Z"))
})

describe('MarkerOptions', () => {
  it('MarkerOptions0', () => {
    const sw = new Site(null, null)
    const actual = sw.MarkerOptions
    const expected = {
      label: null,
      position: null,
      clickable: true,
      draggable: true,
      optimized: true,
    }
    expect(actual).toEqual(expected)
  })

  it('MarkerOptions1', () => {
    const sw = new Site('site name', new Coordinate(1.23, 2.34))
    const actual = sw.MarkerOptions
    const expected = {
      label: 'site name',
      position: { lat: 1.23, lng: 2.34 },
      clickable: true,
      draggable: true,
      optimized: true,
    }
    expect(actual.label).toEqual(expected.label)
    // @ts-ignore
    expect(actual.position.lat).toBeCloseTo(expected.position.lat)
    // @ts-ignore
    expect(actual.position.lng).toBeCloseTo(expected.position.lng)
    expect(actual.clickable).toEqual(expected.clickable)
    expect(actual.draggable).toEqual(expected.draggable)
    expect(actual.optimized).toEqual(expected.optimized)
  })
})
