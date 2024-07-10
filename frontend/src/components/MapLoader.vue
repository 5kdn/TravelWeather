<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map'
import { useSiteStore } from '@/store/sites'
import { calcCenterPoint, calcZoomlevel, getPlaceName } from '@/utils/maps'
import { Coordinate } from '@/utils/coordinate'
import { getWeathers } from '@/utils/weather'
import { Site } from '@/utils/site'

// @ts-ignore TS6133
const apikey = import.meta.env.VITE_GOOGLEMAP_API_KEY
// @ts-ignore TS6133
const myMapRef = ref()
const siteStore = useSiteStore()
// @ts-ignore TS6133
const center = ref(calcCenterPoint(siteStore.sites.map(site => site.coordinate)))
// @ts-ignore TS6133
const zoom = ref(calcZoomlevel(siteStore.sites.map(site => site.coordinate)))


interface InfoItem {
  isShow: boolean
  name?: string
  position?: {
    lat: number
    lng: number
  }
}
const infoItemAddItem = ref<InfoItem>({ isShow: false })
const infoItemRemoveItem = ref<InfoItem>({ isShow: false })

/**
 * @description マップ上でクリックしたときのイベントリスナー
 * @param {google.maps.MapMouseEvent} event mouse event
 */
// @ts-ignore TS6133
const OnClickMapEventListner = (event: google.maps.MapMouseEvent): void => {
  infoItemRemoveItem.value.isShow = false
  if (event.latLng == null){
    return
  }
  let coordinate = new Coordinate(event.latLng.lat(), event.latLng.lng())
  getPlaceName(coordinate)
  .then(name => {
    infoItemAddItem.value = {
      isShow: true,
      name: name,
      position: { lat: coordinate.lat, lng: coordinate.lng},
    }
  }).catch(err => {
    console.error(err)
    infoItemAddItem.value.isShow = false
  })
  return
}

/**
 * @description Addボタンを押したときのイベント
 */
// @ts-ignore TS6133
const onClickAddBtnEvent = async (): void => {
  if (infoItemAddItem.value.position == null) return
  const name = infoItemAddItem.value.name !== undefined ? infoItemAddItem.value.name : null
  const pos = infoItemAddItem.value.position
  const site = new Site(name, new Coordinate(pos.lat, pos.lng))

  // get weathers
  let sitesWithWeather = await getWeathers([site])

  siteStore.push(sitesWithWeather[0])
  infoItemAddItem.value.isShow = false
  return
}

/**
 * @description ピンアイコンをクリックしたときのイベント
 * ピンを削除し、SiteStoreから対象を削除する
 */
const onClickPinIconEvent = (event: google.maps.MapMouseEvent) => {
  infoItemAddItem.value.isShow = false
  let coordinate = new Coordinate(event.latLng!.lat(), event.latLng!.lng())
  infoItemRemoveItem.value = {
    isShow: true,
    position: { lat: coordinate.lat, lng: coordinate.lng},
  }
  return
}

/**
 * @description ピンアイコン削除ボタンをクリックしたときのイベント
 * ピンを削除し、SiteStoreから対象を削除する
 */
const onClickPinRemoveBtnEvent = () => {
  if (infoItemRemoveItem.value.position == null) return
  // remove item
  const pos = infoItemRemoveItem.value.position
  siteStore.removeByLatLng(new Coordinate(pos.lat, pos.lng))
  infoItemRemoveItem.value.isShow = false
}

</script>

<script lang="ts">
export default defineComponent({
  components: {
    GoogleMap,
    'GMap-Marker-Cluster': MarkerCluster,
    'GMap-Marker': Marker,
    InfoWindow,
  },
})

</script>

<template lang="pug">
#map-wrapper
  GoogleMap(
    class="map"
    :api-key="apikey"
    :center="{lat: center.lat, lng: center.lng}"
    :zoom="zoom"
    ref="myMapRef"
    :disable-default-ui="true"
    :clickable-icons="false"
    @click="($event) => OnClickMapEventListner($event)"
  )
    GMap-Marker-Cluster
      GMap-Marker(
        v-for="place in siteStore.sites"
        @click='onClickPinIconEvent($event)'
        :options="place.MarkerOptions")/
    InfoWindow.AddItem(
      v-if="infoItemAddItem.isShow"
      :options="{position: infoItemAddItem.position}")
      v-btn(
        prepend-icon="mdi-plus-circle-outline"
        color="error"
        @click="onClickAddBtnEvent()"
        ) Add
    InfoWindow.RemoveItem(
      v-if="infoItemRemoveItem.isShow"
      :options='{position: infoItemRemoveItem.position}')
      v-btn(
        prepend-icon="mdi-trash-can-outline"
        color="error"
        @click='onClickPinRemoveBtnEvent()'
        ) Remove
</template>

<style scoped lang="scss">
#map-wrapper {
  height: 100%;
  width: 100%;
}
.map {
  position: relative;
  height: 100%;
}
</style>
