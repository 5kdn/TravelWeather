import type { Meta, StoryObj } from '@storybook/vue3'
import Tile from './Tile.vue'
import { HourlyWeather } from '@/utils/hourlyWeather'

const meta = {
  title: 'Weather/Tile',
  component: Tile,
  tags: ['autodocs'],
  argTypes: {
    hourlyWeather: HourlyWeather,
  },
  args: {
    hourlyWeather: new HourlyWeather(null, null, null, null),
  }, // default value
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>
export const Fine: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'Fine', 30, 0),
  },
}

export const Cloudy: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'Cloudy', 25, 50),
  },
}

export const Fog: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'Foggy', 18, 60),
  },
}

export const Drizzle: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'Drizzle', 18, 60),
  },
}

export const FreezingDrizzle: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'FreezingDrizzle', 18, 60),
  },
}

export const FreezingRain: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'FreezingRain', 18, 100),
  },
}

export const Snowy: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'Snowy', -20, 100),
  },
}

export const RainShower: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'RainShower', 15, 95),
  },
}

export const SnowShower: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'SnowShower', 0, 0),
  },
}

export const Thunderstorm: Story = {
  args: {
    hourlyWeather: new HourlyWeather(new Date(), 'Thunderstorm', 18, 90),
  },
}

export const NA: Story = {
  args: {
    hourlyWeather: new HourlyWeather(null, 'NA', null, null),
  },
}

export const Null: Story = {
  args: {
    hourlyWeather: new HourlyWeather(null, null, null, null),
  },
}
