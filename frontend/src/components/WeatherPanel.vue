<script lang="ts" setup>
import { ref } from 'vue';
import { useSiteStore } from '@/store/sites'
import { getWeathers } from '@/utils/weather';
import Tile from './Tile.vue'

const siteStore = useSiteStore()
const reloadingWeatherFlag = ref(false)

/**
 * @description リロードボタンを押したときのイベント
 * SiteStore内の天気を全て再取得する
 */
const onClickReloadBtn = async () => {
  if(siteStore.sites.length == 0) return
  reloadingWeatherFlag.value = true

  try {
    // @ts-ignore
    const newSites = await getWeathers(siteStore.sites)
    siteStore.sites = newSites
  } finally {
    reloadingWeatherFlag.value = false
  }
}

/**
 * @description クリアボタンを押したときのイベント
 * SiteStoreをクリアする
 */
const onClickClearBtn = () => {
  siteStore.clear()
}
</script>


<template lang="pug">
#WeatherPanelWrapper(ref='outerElement' v-if='siteStore.sites.length != 0')
  v-table(
    density='compact'
    hover)
    tbody
      tr#timeline
        th
          .buttonWrapper
            v-btn(
              append-icon='mdi-reload'
              color='green'
              variant='text'
              size='x-small'
              :loading='reloadingWeatherFlag'
              @click='onClickReloadBtn') リロード
            v-btn(
              append-icon='mdi-cancel'
              color='error'
              variant='text'
              size='x-small'
              @click='onClickClearBtn') クリア
        // timeline
        th(v-for='tl in siteStore.timeline')
          span {{ tl.getMonth()+1 }} / {{ tl.getDay() }}
          span {{ tl.getHours() }} :00
      // values
      tr.lines(v-for="site in siteStore.sites")
        th.siteName
          span {{ site.siteName ?? 'new place' }}

        td(v-for="weather in site.weathers")
          v-layout
            Tile.mx-auto(:hourlyWeather='weather')
</template>


<style scoped lang="scss">
.buttonWrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#WeatherPanelWrapper {
  position: relative;
}

tr#timeline span{
  display: block;
  text-align: center;
}
tr.lines {
  height: 48px;
}

th.siteName {
  span {
  width: 100%;
  min-width: max-content;
  height: 100%;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
}

th, td, tr {
  padding: 4px !important;
}
</style>
