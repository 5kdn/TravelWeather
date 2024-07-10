<script setup lang="ts">
const props = withDefaults(defineProps<{
  isReduction: boolean,
}>(), {
  isReduction: false,
})

const emit = defineEmits<{
  (e: 'click', id: boolean): void
}>()

const onClick = () => {
  emit('click', !props.isReduction)
}
</script>


<template lang="pug">
#ReductionBtn-wrapper
  v-layout#ReductionButton-Base(@click='onClick')
    v-icon#ReductionButton-Icon.mx-auto(
      icon="mdi-chevron-double-up"
      :class='{reduction: props.isReduction}')
</template>


<style scoped lang="scss">
@use 'sass:math';
$button-width: 32px;
$button-height: 48px;
$button-border-offset: 2px;
$button-outside-color: #ddd;
$button-inner-color: lighten($button-outside-color, 30);

#ReductionBtn-wrapper {
  display: inline-block;
  width: fit-content;
  height: fit-content;
}
#ReductionButton-Base {
  background: $button-outside-color;
  width: $button-width;
  height: $button-height;
  border-radius: math.div($button-width, 2) math.div($button-width, 2) 0 0;
}
#ReductionButton-Icon {
  background-color: $button-inner-color;
  width: $button-width - 2 * $button-border-offset;
  height: $button-width - 2 * $button-border-offset;
  top: $button-border-offset;
  border-radius: 50%;

  &.reduction {
    transform: rotate(180deg);
  }
}
</style>