#!/usr/bin/env node
import { describe, expect, it } from 'vitest'
import { Coordinate } from '@/utils/coordinate'

describe('latitude', () => {
  it.each([
    [-91, -90, (-90 / 180) * Math.PI],
    [-90, -90, (-90 / 180) * Math.PI],
    [-30, -30, (-30 / 180) * Math.PI],
    [0, 0, 0],
    [30, 30, (30 / 180) * Math.PI],
    [90, 90, (90 / 180) * Math.PI],
    [91, 90, (90 / 180) * Math.PI],
  ])('degree %i->(%i, %f)', (lat, actLat, actLatRad) => {
    const obj = new Coordinate(lat, 0, false)
    expect(obj.lat).toBeCloseTo(actLat)
    expect(obj.latRad).toBeCloseTo(actLatRad)
  })

  it.each([
    [(-91 / 180) * Math.PI, -90, (-90 / 180) * Math.PI],
    [(-90 / 180) * Math.PI, -90, (-90 / 180) * Math.PI],
    [(-30 / 180) * Math.PI, -30, (-30 / 180) * Math.PI],
    [0, 0, 0],
    [(30 / 180) * Math.PI, 30, (30 / 180) * Math.PI],
    [(90 / 180) * Math.PI, 90, (90 / 180) * Math.PI],
    [(91 / 180) * Math.PI, 90, (90 / 180) * Math.PI],
  ])('radians %i->(%i, %f)', (lat, actLat, actLatRad) => {
    const obj = new Coordinate(lat, 0, true)
    expect(obj.lat).toBeCloseTo(actLat)
    expect(obj.latRad).toBeCloseTo(actLatRad)
  })
})

describe('longitude', () => {
  it.each([
    [-720, 0, 0 * Math.PI],
    [-360, 0, 0 * Math.PI],
    [-180, 180, 1 * Math.PI], // expect pi rad, but actualy
    [-179, -179, (-179 / 180) * Math.PI],
    [-30, -30, (-30 / 180) * Math.PI],
    [0, 0, 0],
    [30, 30, (30 / 180) * Math.PI],
    [180, 180, 1 * Math.PI],
    [181, -179, (-179 / 180) * Math.PI],
    [360, 0, 0 * Math.PI], // expect -pi rad, but actualy 0
    [720, 0, 0 * Math.PI],
  ])('degree %i->(%i, %f)', (lng, actLng, actLngRad) => {
    const obj = new Coordinate(0, lng, false)
    expect(obj.lng).toBeCloseTo(actLng, 8)
    expect(obj.lngRad).toBeCloseTo(actLngRad, 8)
  })

  it.each([
    [(-720 / 180) * Math.PI, 0, (0 / 180) * Math.PI],
    [(-360 / 180) * Math.PI, 0, (0 / 180) * Math.PI],
    [(-180 / 180) * Math.PI, 180, (180 / 180) * Math.PI],
    [(-179 / 180) * Math.PI, -179, (-179 / 180) * Math.PI],
    [(-90 / 180) * Math.PI, -90, (-90 / 180) * Math.PI],
    [(-30 / 180) * Math.PI, -30, (-30 / 180) * Math.PI],
    [0, 0, 0],
    [(30 / 180) * Math.PI, 30, (30 / 180) * Math.PI],
    [(90 / 180) * Math.PI, 90, (90 / 180) * Math.PI],
    [(180 / 180) * Math.PI, 180, (180 / 180) * Math.PI],
    [(181 / 180) * Math.PI, -179, (-179 / 180) * Math.PI],
    [(360 / 180) * Math.PI, 0, (0 / 180) * Math.PI],
    [(720 / 180) * Math.PI, 0, (0 / 180) * Math.PI],
  ])('radians %i->(%i, %f)', (lngRad, actLng, actLngRad) => {
    const obj = new Coordinate(0, lngRad, true)
    console.log('lng       ', obj.lng)
    console.log('actLng    ', actLng)
    console.log('lngRad    ', obj.lngRad)
    console.log('actLngRad ', actLngRad)
    expect(obj.lng).toBeCloseTo(actLng, 8)
    expect(obj.lngRad).toBeCloseTo(actLngRad, 8)
  })
})
