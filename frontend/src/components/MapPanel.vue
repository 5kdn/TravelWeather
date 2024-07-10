<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import MapLoader from './MapLoader.vue'
import ReductionBtn from '@/components/ReductionBtn.vue'

const isReductionMapLoader = ref<boolean>(false)

const updateReduction = (newVal: boolean) => {
  isReductionMapLoader.value = newVal
}

</script>

<script lang="ts">
export default defineComponent({
  components: {
    'Map-Loader': MapLoader,
    'Reduction-Btn': ReductionBtn,
  },
})
</script>

<template lang="pug">
#MapPanel-Wrapper(:class='{reduction: isReductionMapLoader}')
  #MapPanel(:class="{reduction: isReductionMapLoader}")
    Map-Loader/
  Reduction-Btn#RBTN(
    :is-reduction='isReductionMapLoader'
    @click='updateReduction')/
</template>

<style lang="scss" >
@use 'sass:math';
$map-height: 90vh;
$reduction-ratio: 0.3;

#MapPanel-Wrapper {
  display: block;
  width: 100%;
  height: $map-height;
  transition: all 300ms 0s ease;
  position: relative;
  overflow: hidden;
  &.reduction {
    transition: all 300ms 0s ease;
    height: $map-height * $reduction-ratio;
  }
  #MapPanel {
    height: $map-height;
    transition: all 300ms 0s ease;
    &.reduction {
      transition: all 300ms 0s ease;
      height: $map-height * $reduction-ratio;
    }
  }
}

#RBTN {
  position: absolute;
  right:32px;
  bottom: 0px;
}
</style>
