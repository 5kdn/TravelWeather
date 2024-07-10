/**
 * @description 座標クラス
 * @class Coordinate
 */
export class Coordinate {
  private _latDegree: number = 0
  private _lngDegree: number = 0

  /**
   * Creates an instance of Coordinate.
   * @param {number} lat 度表記の緯度. [-90, 90]
   * @param {number} lng 度表記の経度. (-180, 180]
   * @param {boolean} [isRadians=false] radianの場合はtrue.
   * @memberof Coordinate
   */
  constructor(
    lat: number | (() => number),
    lng: number | (() => number),
    isRadians: boolean = false,
  ) {
    if (!isRadians) {
      this.lat = typeof lat === 'number' ? lat : lat()
      this.lng = typeof lng === 'number' ? lng : lng()
    } else {
      this.latRad = typeof lat === 'number' ? lat : lat()
      this.lngRad = typeof lng === 'number' ? lng : lng()
    }
  }

  get lat(): number {
    return this._latDegree
  }

  set lat(value: number) {
    let val = value
    if (val > 90) val = 90
    if (val < -90) val = -90
    this._latDegree = val
  }

  get latRad(): number {
    return (this._latDegree * Math.PI) / 180
  }

  set latRad(value: number) {
    this.lat = (value * 180) / Math.PI
  }

  get lng(): number {
    return this._lngDegree
  }

  /**
   * @description Longitude must be below 180 deg and above -180 deg. (-180, 180]
   * @memberof Coordinate
   */
  set lng(value: number) {
    let val = value
    val = (val - 180) % 360
    val += val > 0 ? -180 : +180
    this._lngDegree = val
  }

  get lngRad(): number {
    return (this._lngDegree * Math.PI) / 180
  }

  set lngRad(value: number) {
    this.lng = (value * 180) / Math.PI
  }
}
