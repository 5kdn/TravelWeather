<script setup lang="ts">
import { ref, watch } from 'vue'

const isActive = ref<boolean>(false)

const props = defineProps<{
  isActive: boolean,
  items: {
    name: string,
  }[]
}>()

watch(() => props.isActive, () => {
  isActive.value = props.isActive
})

const emits = defineEmits<{
  (e: 'sender', index: number): void
}>()

const onClickEvent = (i: number) => {
  emits('sender', i)
  isActive.value = false
}
</script>


<template lang='pug'>
v-dialog.w-90.w-md-50(v-model="isActive")
  v-card.bg-white
    v-hover(v-slot="{ isHovering, props }" v-for="(item, index) in props.items")
      v-btn(
        v-bind="props"
        :elevation="isHovering ? 16 : 2"
        :color='isHovering ? "green" : ""'
        @click='onClickEvent(index)'
        ) {{ item.name }}
</template>


<style scoped lang="scss">
</style>
