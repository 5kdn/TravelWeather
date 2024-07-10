#!/usr/bin/env node
export class HourlyWeather {
  private _time: Date | null = null

  private _icon: string = 'NA'

  private _temperture: number | null = null

  private _chanceOfRain: number | null = null

  constructor(
    time: Date | null,
    icon:
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
      | 'NA'
      | null,
    temperture: number | null,
    chanceOfRain: number | null,
  ) {
    this.time = time
    this.icon = icon != null ? icon : 'NA'
    this.temperture = temperture
    this.chanceOfRain = chanceOfRain
  }

  public get time(): Date | null {
    return this._time
  }

  public set time(v: Date | null) {
    this._time = v
  }

  public get icon(): string {
    return this._icon
  }

  public set icon(
    v:
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
      | 'NA'
      | null,
  ) {
    if (v == null) this._icon = 'NA'
    else this._icon = v
  }

  public get temperture(): number | null {
    return this._temperture
  }

  public set temperture(v: number | null) {
    this._temperture = v
  }

  public get chanceOfRain(): number | null {
    return this._chanceOfRain
  }

  public set chanceOfRain(v: number | null) {
    this._chanceOfRain = v
  }
}
