#!/usr/bin/env node
import { Coordinate } from './coordinate'
import { HourlyWeather } from './hourlyWeather'

export class Site {
  private _siteName: string|null = null
  private _coordinate: Coordinate|null
  private _weathers: Array<HourlyWeather> = [] as Array<HourlyWeather>
  private _begin: Date|null = null
  private _end: Date|null = null

  constructor(siteName: string|null, coordinate: Coordinate|null = null, weathers: HourlyWeather[] = []) {
    this.siteName = siteName
    this._coordinate = coordinate
    this._weathers = weathers
    if(weathers.length > 0){
      this.calcDate()
    }

  }

  public get siteName(): string|null {
    return this._siteName
  }

  public set siteName(name: string | null) {
    this._siteName = name
  }

  public get coordinate(): Coordinate|null {
    return this._coordinate
  }

  public set coordinate(c: Coordinate|null) {
    this._coordinate = c
  }

  public get weathers(): Array<HourlyWeather> {
    return this._weathers
  }

  public set weathers(weathers: Array<HourlyWeather>) {
    this._weathers = weathers
    this.calcDate()
  }

  public get timeBegin(): Date|null {
    return this._begin
  }

  public get timeEnd(): Date|null {
    return this._end
  }

  public get MarkerOptions(): google.maps.MarkerOptions {
    // TODO: 非推奨 google.maps.AdvancedMarkerElementに移行
    // https://developers.google.com/maps/documentation/javascript/advanced-markers/migration?hl=ja
    return {
      label: this.siteName,
      position:
        this.coordinate !== null
          ? { lat: this.coordinate?.lat, lng: this.coordinate?.lng }
          : null,
      clickable: true,
      draggable: true,
      optimized: true,
    }
  }

  public get AdvancedMarkerOptions() {
    // TODO: 実装
    return ""
  }

  /**
   * @description 開始/終了時刻を取得する
   */
  private calcDate = (): void => {
    if(this._weathers.length == 0){
      this._begin = null
      this._end = null
      return
    }
    this._begin = this._weathers[0].time
    this._end = this._weathers[this.weathers.length - 1].time
  }
}
