<script lang="ts" setup>
import { HourlyWeather } from '@/utils/hourlyWeather'

export interface Props {
  hourlyWeather?: HourlyWeather
}
const props = withDefaults(defineProps<Props>(), {
  hourlyWeather: () => new HourlyWeather(null, null, null, null),
})
</script>

<template lang="pug">
#Tile-Inner-Wrapper
  .hourly_item
    v-icon.icon.Fine(
      v-if="props.hourlyWeather.icon === 'Fine'" icon="mdi-weather-sunny")
    v-icon.icon.Cloudy(
      v-if="props.hourlyWeather.icon === 'Cloudy'" icon="mdi-weather-cloudy")
    v-icon.icon.Foggy(
      v-if="props.hourlyWeather.icon === 'Foggy'" icon="mdi-weather-fog")
    v-icon.icon.Drizzle(
      v-if="props.hourlyWeather.icon === 'Drizzle'" icon="mdi-weather-pouring")
    v-icon.icon.FreezingDrizzle(
      v-if="props.hourlyWeather.icon === 'FreezingDrizzle'" icon="mdi-weather-pouring")
    v-icon.icon.Rainy(
      v-if="props.hourlyWeather.icon === 'Rainy'" icon="mdi-weather-rainy")
    v-icon.icon.FreezingRain(
      v-if="props.hourlyWeather.icon === 'FreezingRain'" icon="mdi-weather-pouring")
    v-icon.icon.Snowy(
      v-if="props.hourlyWeather.icon === 'Snowy'" icon="mdi-weather-snowy")
    v-icon.icon.RainShower(
      v-if="props.hourlyWeather.icon === 'RainShower'" icon="mdi-weather-partly-rainy")
    v-icon.icon.SnowShower(
      v-if="props.hourlyWeather.icon === 'SnowShower'" icon="mdi-weather-partly-snowy")
    v-icon.icon.Thunderstorm(
      v-if="props.hourlyWeather.icon === 'Thunderstorm'" icon="mdi-lightning-bolt-outline")
    v-icon.icon.NA(
      v-if="props.hourlyWeather.icon === 'NA'" icon="mdi-close")
    .description
      .temp
        v-icon(v-if='props.hourlyWeather.temperture === null' icon="mdi-close")
        span(v-else) {{ props.hourlyWeather.temperture.toFixed(1) }}
      .separator: span /
      .chance_of_rain
        v-icon(v-if='props.hourlyWeather.chanceOfRain === null' icon="mdi-close")
        span(v-else) {{ props.hourlyWeather.chanceOfRain.toFixed(0) }}
</template>

<style lang="scss" scoped>
$item_size: 48px;
$icon_height: 30px;
$text_size: 7pt;
$separator_size: 13pt;

.hourly_item {
  user-select: none;
  width: $item_size;
  height: $item_size;
  display: flex;
  flex-direction: column;

  .icon {
    display: block;
    height: $icon_height;
    width: 100%;
    &.Fine {
      color: red;
    }
    &.Cloudy {
      color: gray;
    }
    &.Foggy {
      color: cadetblue;
    }
    &.Drizzle {
      color: cadetblue;
    }
    &.FreezingDrizzle {
      color: cadetblue;
    }
    &.Rainy {
      color: cadetblue;
    }
    &.FreezingRain {
      color: cadetblue;
    }
    &.Snowy {
      color: cadetblue;
    }
    &.RainShower {
      color: cadetblue;
    }
    &.SnowShower {
      color: cadetblue;
    }
    &.Thunderstorm {
      color: rgb(210, 210, 0);
    }
    &.NA {
      color: darkslategray;
    }
  }
  .description {
    flex-grow: 1;
    display: flex;
    text-justify: center;
    text-align: center;

    .temp,
    .chance_of_rain,
    .separator {
      display: flex;
      align-items: center;
      text-align: center;
      span {
        width: 100%;
      }
    }
    .temp,
    .chance_of_rain {
      flex-grow: 1;
      justify-content: center;
      align-items: center;
      font-size: $text_size;
    }
    .separator {
      font-size: $separator_size;
    }
    .temp > span::after {
      content: '℃';
    }
    .chance_of_rain > span::after {
      content: '%';
    }
  }
}
</style>
