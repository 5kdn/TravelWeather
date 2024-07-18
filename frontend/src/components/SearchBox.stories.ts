import type { Meta, StoryObj } from '@storybook/vue3'
import SearchBox from './SearchBox.vue'
import { fn } from '@storybook/test'

const meta = {
  title: 'Map/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    onSender: fn()
  }, // default value
} satisfies Meta<typeof SearchBox>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
  },
}
