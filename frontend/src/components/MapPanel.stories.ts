import type { StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import MapPanel from './MapPanel.vue'

const meta = {
  title: 'Map/MapPanel',
  component: MapPanel,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
  <div style="
    border:1px solid red;
  ">
    <story />
  </div>`,
    }),
  ],
  argTypes: {},
  args: {},
  methods: {
    toggleReduction: action('click'),
  },
} // satisfies Meta<typeof undefined>
export default meta

type Story = StoryObj<typeof meta>
export const Expantion: Story = {
  args: {},
}

export const Reduction: Story = {
  args: {},
}
