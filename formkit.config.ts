import { cs, en, de } from '@formkit/i18n'
import { defineFormKitConfig } from "@formkit/vue"
import { rootClasses } from './formkit.theme'

export default defineFormKitConfig({
    config: {
      rootClasses
    },
    locales: { cs, en, de },
    locale: 'cs'
  })