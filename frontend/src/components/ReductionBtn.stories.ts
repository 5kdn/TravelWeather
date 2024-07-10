import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import ReductionBtn from './ReductionBtn.vue'

const meta = {
  title: 'utils/ReductionBtn',
  component: ReductionBtn,
  tags: ['autodocs'],
  argTypes: {
    isReduction: Boolean,
  },
  args: {
    isReduction: false,
    onClick: fn(),
  }

} satisfies Meta<typeof ReductionBtn>

export default meta
type Story = StoryObj<typeof meta>
export const Folding: Story = {
  args: {
    isReduction: true,
  }
}

export const UnFolding: Story = {
  args: {
    isReduction: false,
  }
}
