import type { Meta, StoryObj } from '@storybook/vue3'
import MapLoader from './MapLoader.vue'
import { useSiteStore } from '@/store/sites'
import { Site } from '@/utils/site'
import { Coordinate } from '@/utils/coordinate'

const meta: Meta<typeof MapLoader> = {
  title: 'Map/MapLoader',
}
export default meta

type Story = StoryObj<typeof meta>
export const None: Story = {
  render: () => ({
    setup () {
      const store = useSiteStore()
      store.clear()
    },
    components: { MapLoader },
    template: `<div style="width:100%;height:100vh;border:1px solid red;"><MapLoader /></div>`,
  }),
}

export const Single: Story = {
  render: () => ({
    setup(){
      const siteStore = useSiteStore()
      siteStore.clear()
      siteStore.push(new Site("place A", new Coordinate(35.676764, 139.73369)))
    },
    components: {MapLoader},
    template: `<div style="width:100%;height:100vh;border:1px solid red;"><MapLoader /></div>`,
  })
}

export const Multi: Story = {
  render: () => ({
    setup(){
      const siteStore = useSiteStore()
      siteStore.clear()
      siteStore.push(new Site('A', new Coordinate(35.676764, 139.73369)))
      siteStore.push(new Site('B', new Coordinate(35.64211, 139.751527)))
      siteStore.push(new Site('C', new Coordinate(35.278699, 139.67004)))
      siteStore.push(new Site('D', new Coordinate(35.562479, 139.716073)))
      siteStore.push(new Site('E', new Coordinate(43.066739, 141.35056)))
    },
    components: {MapLoader},
    template: `<div style="width:100%;height:100vh;border:1px solid red;"><MapLoader /></div>`,
  })
}