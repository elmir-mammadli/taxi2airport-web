import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VPicker } from 'vuetify/labs/VPicker'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VPicker,
      ...components
    },
    directives
  })

  nuxtApp.vueApp.use(vuetify)
})
