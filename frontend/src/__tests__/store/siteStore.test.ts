#!/usr/bin/env node
import { setActivePinia, createPinia } from "pinia"
import { useSiteStore } from "@/store/sites"
import { Site } from "@/utils/site"
import { HourlyWeather } from "@/utils/hourlyWeather"
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from "vue"

const app = createApp({})

describe('actions/push', () => {
  beforeEach(async () => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })

  it('push', () => {
    const store = useSiteStore()
    store.clear()

    const name = null
    const expectedName = null
    const coordinate = null
    const hw = [] as HourlyWeather[]
    const insertItem = new Site(name, coordinate, hw)

    store.push(insertItem)
    const actual = store.$state.sites
    expect(actual).toHaveLength(1)
    expect(actual[0].siteName).toEqual(expectedName)
    expect(actual[0].coordinate).toEqual(coordinate)
    expect(actual[0].weathers).toEqual(hw)
  })

  it('push', () => {
    const store = useSiteStore()
    store.clear()
    const name = 'dummy site name'
    const expectedName = 'dummy site name'
    const coordinate = null
    const hw = [] as HourlyWeather[]
    const insertItem = new Site(name, coordinate, hw)

    store.push(insertItem)
    const actual = store.$state.sites
    expect(actual).toHaveLength(1)
    expect(actual[0].siteName).toEqual(expectedName)
    expect(actual[0].coordinate).toEqual(coordinate)
    expect(actual[0].weathers).toEqual(hw)
  })

  it('push', async() => {
    const store = useSiteStore()
    store.clear()
  })
})

describe('actions/remove', () => {
  it('', () => {})
})
describe('actions/clear', () => {
  it('', () => {})
})
describe('actions/getWeather', () => {
  it('', () => {})
})
describe('actions/refleshAllWeather', () => {
  it('', () => {})
})

describe('getter/one', () => {
  it('', () => {})
})
describe('getter/all', () => {
  it('', () => {})
})
describe('getter/timeline', () => {
  it('', () => {})
})