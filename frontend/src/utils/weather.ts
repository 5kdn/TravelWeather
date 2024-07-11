#!/usr/bin/env node
import { fetchWeatherApi } from 'openmeteo'
import type { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response'
import { Coordinate } from './coordinate'
import { Site } from './site'
import { HourlyWeather } from './hourlyWeather'

const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export interface ConvWeatherFromResp {
  temp: Float32Array
  precipitation: Float32Array,
  code: Float32Array,
}

export interface HourlyWeathers {
  time: Array<Date>
  weathers: Array<ConvWeatherFromResp>
}

/**
 * @description 天気予報を取得する
 * @param sites
 * @returns sites
 */
export const getWeathers = async (sites: Site[]): Promise<Site[]> => {
  // Site.Coordinate == nullの発見とlat/lngのフォーマット
  let blank = [] as number[]
  let coordinates = [] as Coordinate[]
  sites.forEach((site, index) => {
    if(site.coordinate == null){
      blank.push(index)
      return
    }
    coordinates.push(site.coordinate)
  })

  const lat = [] as Array<string>
  const lng = [] as Array<string>
  coordinates.forEach((site) => {
    if (site.lat != null && site.lng != null) {
      lat.push(site.lat.toString())
      lng.push(site.lng.toString())
    }
  })

  // 天気予報を取得してフォーマットする
  return new Promise((resolve, reject) => {
    getWeathersFromMeteo(lat.join(','), lng.join(','))
    .then((weatherApiResponses) => {
      for (let i = 0; i < sites.length; i++) {
        if (blank.includes(i)) {
          sites[i].weathers = [] as HourlyWeather[]
          continue
        }
        let we = weatherApiResponses.pop()
        if (we === undefined) {
          sites[i].weathers = [] as HourlyWeather[]
          continue
        }
        sites[i].weathers = convWeatherFromResp2HourlyWeather(we)
      }
      resolve(sites)
    })
    .catch((e) => reject(e))
  })
}

// @ts-ignore
export const getWeathers222 = async (dummy: string): Promise<WeatherApiResponse[]> => {
  return new Promise((resolve, reject) => {
    getWeathersFromMeteo("0.0", "0.0")
    .then((weatherApiResponses) => {
      resolve(weatherApiResponses)
    })
    .catch((e) => reject(e))
  })
}


export const getWeathersFromMeteo = (lat: string, lng: string): Promise<WeatherApiResponse[]> => {
  const url = 'https://api.open-meteo.com/v1/forecast'
  const params = {
    latitude: lat,
    longitude: lng,
    hourly: ['temperature_2m', 'precipitation', 'weather_code'],
    timezone: 'Asia/Tokyo',
    forecast_days: 7,
  }

  return new Promise((resolve, reject) => {
    fetchWeatherApi(url, params)
    .then((resp) => {
      resolve(resp)
    })
    .catch((e) => reject(e))
  })
}


export const convWeatherFromResp2HourlyWeather = (resp: WeatherApiResponse): HourlyWeather[] => {
  const utcOffsetSeconds = resp.utcOffsetSeconds()
  const hourly = resp.hourly()!
  const times = range(
    Number(hourly.time()),
    Number(hourly.timeEnd()),
    hourly.interval()
  ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
  const temp: Float32Array = hourly.variables(0)!.valuesArray()!
  const precipitation: Float32Array = hourly.variables(1)!.valuesArray()!
  const code: Float32Array = hourly.variables(2)!.valuesArray()!

  const hourlyWeathers = [] as Array<HourlyWeather>
  for (let index = 0; index < code.length; index += 1) {
    hourlyWeathers.push(
      new HourlyWeather(
        times[index],
        convWMOCode2String(code[index]),
        temp[index],
        precipitation[index]
      )
    )
  }
  return hourlyWeathers
}

export const convWMOCode2String = (code: number | null):
  | 'Fine'
  | 'Cloudy'
  | 'Foggy'
  | 'Drizzle'
  | 'FreezingDrizzle'
  | 'Rainy'
  | 'FreezingRain'
  | 'Snowy'
  | 'RainShower'
  | 'SnowShower'
  | 'Thunderstorm'
  | 'NA' => {
  switch (code) {
    // 0	Clear sky
    case 0: return 'Fine'
    // 1, 2, 3	Mainly clear, partly cloudy, and overcast
    case 1: return 'Cloudy'
    case 2: return 'Cloudy'
    case 3: return 'Cloudy'
    // 45, 48	Fog and depositing rime fog
    case 45: return 'Foggy'
    case 48: return 'Foggy'
    // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
    case 51: return 'Drizzle'
    case 53: return 'Drizzle'
    case 55: return 'Drizzle'
    // 56, 57	Freezing Drizzle: Light and dense intensity
    case 56: return 'FreezingDrizzle'
    case 57: return 'FreezingDrizzle'
    // 61, 63, 65	Rain: Slight, moderate and heavy intensity
    case 61: return 'Rainy'
    case 63: return 'Rainy'
    case 65: return 'Rainy'
    // 66, 67	Freezing Rain: Light and heavy intensity
    case 66: return 'FreezingRain'
    case 67: return 'FreezingRain'
    // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    // 77	Snow grains
    case 71: return 'Snowy'
    case 73: return 'Snowy'
    case 75: return 'Snowy'
    case 77: return 'Snowy'
    // 80, 81, 82	Rain showers: Slight, moderate, and violent
    case 80: return 'RainShower'
    case 81: return 'RainShower'
    case 82: return 'RainShower'
    // 85, 86	Snow showers slight and heavy
    case 85: return 'SnowShower'
    case 86: return 'SnowShower'
    // 95 *	Thunderstorm: Slight or moderate
    // 96, 99 *	Thunderstorm with slight and heavy hail
    case 95: return 'Thunderstorm'
    case 96: return 'Thunderstorm'
    case 99: return 'Thunderstorm'
    default: return'NA'
  }
}
