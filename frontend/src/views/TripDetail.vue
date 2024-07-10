<script setup lang="ts">
import { defineComponent } from 'vue'
import MapPanel from '@/components/MapPanel.vue'
import WeatherPanel from '@/components/WeatherPanel.vue'
</script>


<script lang="ts">
export default defineComponent({
  components: {
    'Map-Panel': MapPanel,
    'Weather-Panel': WeatherPanel,
  }
})
</script>


<template lang="pug">
#TripDetailWrapper
  #MAPP
    Map-Panel/
  #WETH
    Weather-Panel/
</template>

<style lang="scss" scoped>
#TripDetailWrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  min-height: 100vh;
  background-color: bisque;
}
#MAPP {
  flex: 0 1 auto;
}
#WETH {
  background-color: cadetblue;
  flex: 1 1 auto;
}
</style>
