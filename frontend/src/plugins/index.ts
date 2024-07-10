/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import type { App } from 'vue'
import pinia from '@/store'
import vuetify from './vuetify'


export const registerPlugins = (app: App) => {
  app
  .use(pinia)
  .use(vuetify)
}
