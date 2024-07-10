import { setup } from '@storybook/vue3'
import { registerPlugins } from '../src/plugins'

import type { Preview } from '@storybook/vue3'
import { createPinia } from 'pinia'

// Plugins
import { withVuetifyTheme } from './withVuetifyTheme.decorator'

const pinia = createPinia()

setup((app) => {
  // Registers your app's plugins into Storybook
  app.use(pinia)
  registerPlugins(app)
})

export const GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      dynamicTitle: true,
    },
  },
}

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorator = [withVuetifyTheme]
export default preview
