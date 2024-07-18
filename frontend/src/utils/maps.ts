#!/usr/bin/env node
import axios from 'axios'
import { Coordinate } from './coordinate'

/**
 * @description 複数座標の中心座標を計算する
 * @export
 * @param {Array<google.maps.MarkerOptions>} markerOptions 対象の座標群
 * @returns {*}  {google.maps.LatLng} 中心座標
 */
export const calcCenterPoint = (places: Array<Coordinate | null>): Coordinate => {
  if (places.length === 0) return new Coordinate(39.65471648, 138.00118571)
  const pointA = new Coordinate(-90.0, -179.0)
  const pointB = new Coordinate(90.0, 180.0)

  places.forEach(place => {
    if (place != null) {
      pointA.lat = Math.max(pointA.lat, place.lat)
      pointA.lng = Math.max(pointA.lng, place.lng)
      pointB.lat = Math.min(pointB.lat, place.lat)
      pointB.lng = Math.min(pointB.lng, place.lng)
    }
  })
  return new Coordinate(
    (pointA.lat + pointB.lat) / 2,
    (pointA.lng + pointB.lng) / 2,
  )
}

/**
 * @description googlemapのzoom levelを計算する
 * @export
 * @param {Array<google.maps.MarkerOptions>} markerOptions 対象の座標群
 * @returns {*}  {number} zoom level
 */
export const calcZoomlevel = (places: Array<Coordinate | null>): number => {
  // 座標が0個の場合は日本全体を表示
  if (places.length === 0) return 4.7
  // 座標が1個の場合は固定値
  if (places.length === 1) return 15

  // ヒュベニの公式から距離を出す
  const EQUATOR_RADIUS = 6378137.0 // 赤道半径
  const E2 = 0.006694379990197585 // 離心率

  const radPointA = new Coordinate(-90, -179) // 右上
  const radPointB = new Coordinate(90, 180) // 左下
  places.forEach(place => {
    if (place != null) {
      radPointA.lat = Math.max(radPointA.lat, place.lat)
      radPointA.lng = Math.max(radPointA.lng, place.lng)
      radPointB.lat = Math.min(radPointB.lat, place.lat)
      radPointB.lng = Math.min(radPointB.lng, place.lng)
    }
  })

  const latDiff = radPointA.latRad - radPointB.latRad // 緯度差
  const lngDiff = radPointA.lngRad - radPointB.lngRad // 経度差
  const latAvrg = (radPointA.latRad + radPointB.latRad) / 2 // 平均緯度

  const w = Math.sqrt(1 - E2 * Math.sin(latAvrg) ** 2)
  const m = (EQUATOR_RADIUS * (1 - E2)) / w ** 3 // 子午線曲率半径
  const n = EQUATOR_RADIUS / w // 卯酉線曲半径
  const distance =
    Math.sqrt((m * latDiff) ** 2 + (n * lngDiff * Math.cos(latAvrg)) ** 2) /
    1000 // 距離計測

  const zoomLevel = 15.2 - 1.44 * Math.log(distance)
  return zoomLevel
}

/**
 * @description 座標から地点名を取得する
 *
 * @param {Coordinate} coordinate 座標
 * @returns {Promise<string>} 地点名称
 */
export const getPlaceName = (coordinate: Coordinate): Promise<string> => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({location: new google.maps.LatLng(coordinate.lat, coordinate.lng)})
    .then((response) => {
      if (response.results[0]) {
        const res = response.results[0]
        if (res.address_components.length <= 2){
          reject(new Error('失敗') )
        }

        let name: string = ''
        res.address_components
        .reverse()
        .slice(1, res.address_components.length - 1)
        .forEach(element => {
          name += element.short_name
        })
        resolve(name)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}


export const getCoordinateFromAddress = async (address: string): Promise<{name:string,coordinate:Coordinate}[]|null> => {
  const endpoint = '/api/coordinate'
  const params = {
    address: address,
  }

  return new Promise((resolve, reject) => {
    axios.get(endpoint, {params})
    .then((resp) => {
      if(resp.status !== 200){ throw new Error(resp.statusText) }

      const data = resp.data
      if(data['status'] !== 'ok'){ throw new Error(data['error']) }

      const sites = [] as {name: string, coordinate: Coordinate}[]
      data['result'].forEach((item: {name: string,lat: number, lng: number}) => {
        sites.push({
          name: item['name'],
          coordinate: new Coordinate(item['lat'], item['lng'])
        })
      })
      return resolve(sites)
    })
    .catch((err) => {
      return reject(err)
    })
  })
}
