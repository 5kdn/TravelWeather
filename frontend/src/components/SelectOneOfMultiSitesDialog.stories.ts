import type { Meta, StoryObj } from '@storybook/vue3'
import SelectOneOfMultiSitesDialog from './SelectOneOfMultiSitesDialog.vue'
import { fn } from '@storybook/test'


const meta = {
  title: 'Map/SelectOneOfMultiSitesDialog',
  component: SelectOneOfMultiSitesDialog,
  tags: ['autodocs'],
  argTypes: {
    isActive: Boolean,
    items: Array<{name: string, lat: number, lng: number}>,
  },
  args: {
    isActive: true,
    onSender: fn(),
  }, // default value
} satisfies Meta<typeof SelectOneOfMultiSitesDialog>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    items: [
      {name: "dummy 0"},
      {name: "dummy 1"},
      {name: "dummy 2"},
      {name: "dummy 3"},
      {name: "dummy 4"},
    ],
  },
}
