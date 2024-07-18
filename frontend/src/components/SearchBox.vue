<script lang='ts' setup>
import { ref } from 'vue'

const searchValue = ref('')

const emits = defineEmits<{
  (e: 'sender', value: string): void
}>()

const onSubmitEvent = () => {
  if(!searchValue.value || searchValue.value.length == 0){
    return
  }
  emits('sender', searchValue.value)
}
</script>


<template lang='pug'>
v-form.d-flex.flex-row.align-stretch.ma-0.pa-0.w-100.bg-white.max-wid(@submit='onSubmitEvent' @submit.prevent)
  v-text-field(
    v-model='searchValue'
    placeholder='where would u like to see the weather?'
    clearable
    density='compact'
    hide-details='true'
  )
  v-btn.h-auto(variant="outlined" type='submit')
    v-icon(icon='mdi-magnify')
</template>


<style lang='scss' scoped>
.max-wid {
  @media all and (min-width: 600px) {
    // sm and more
    max-width: 600px;
  }
}
</style>