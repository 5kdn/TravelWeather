import type { Meta, StoryObj } from '@storybook/vue3'
import WeatherPanel from './WeatherPanel.vue'
import { useSiteStore } from '@/store/sites'
import { Site } from '@/utils/site'
import { Coordinate } from '@/utils/coordinate'
import { HourlyWeather } from '@/utils/hourlyWeather'

const meta = {
  title: 'Weather/WeatherPanel',
  component: WeatherPanel,
  tags: ['autodocs'],
    render: () => ({
      setup(){
        const siteStore = useSiteStore()
        siteStore.clear()
        siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      },
      components: {WeatherPanel},
      template: `<div style="width:100%;height:100vh;border:1px solid red;"><WeatherPanel /></div>`,
    })

} satisfies Meta<typeof WeatherPanel>

export default meta
type Story = StoryObj<typeof meta>
export const Single: Story = {
  render: () => ({
    setup(){
      const siteStore = useSiteStore()
      siteStore.clear()
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
    },
    components: {WeatherPanel},
    template: `<div style="width:100%;height:70vh;border:1px solid red;"><WeatherPanel /></div>`,
  })
}

export const Multi: Story = {
  render: () => ({
    setup(){
      const siteStore = useSiteStore()
      siteStore.clear()
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369)))
    },
    components: {WeatherPanel},
    template: `<div style="width:100%;height:70vh;border:1px solid red;"><WeatherPanel /></div>`,
  })
}

export const MultiWithHourlyWeather: Story = {
  render: () => ({
    setup(){
      const siteStore = useSiteStore()
      siteStore.clear()
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
      ]))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
      ]))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
      ]))
    },
    components: {WeatherPanel},
    template: `<div style="width:100%;height:70vh;border:1px solid red;"><WeatherPanel /></div>`,
  })
}

export const MultiWithManyHourlyWeather: Story = {
  render: () => ({
    setup(){
      const siteStore = useSiteStore()
      siteStore.clear()
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
      ]))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
      ]))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
      ]))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
      ]))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T04:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T05:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T06:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T07:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T08:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T09:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T10:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T11:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T12:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T13:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T14:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T15:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T16:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T17:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T18:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T19:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T20:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T21:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T22:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T23:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-03T00:00:00.000Z"),"Rainy",10,100),
      ]))
      siteStore.push(new Site(null, new Coordinate(35.676764, 139.73369), [
        new HourlyWeather(new Date("2024-01-02T01:00:00.000Z"),"Fine",30,1),
        new HourlyWeather(new Date("2024-01-02T02:00:00.000Z"),"Cloudy",20,30),
        new HourlyWeather(new Date("2024-01-02T03:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T04:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T05:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T06:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T07:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T08:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T09:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T10:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T11:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T12:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T13:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T14:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T15:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T16:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T17:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T18:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T19:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T20:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T21:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T22:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-02T23:00:00.000Z"),"Rainy",10,100),
        new HourlyWeather(new Date("2024-01-03T00:00:00.000Z"),"Rainy",10,100),
      ]))
    },
    components: {WeatherPanel},
    template: `<div style="width:100%;height:70vh;border:1px solid red;"><WeatherPanel /></div>`,
  })
}