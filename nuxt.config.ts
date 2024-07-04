// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '~/assets/css/main.css',
    '@mdi/font/css/materialdesignicons.min.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css'
  ],
  modules: [
    '@nuxt/image',
    '@formkit/nuxt',
    'nuxt-primevue',
    'nuxt-headlessui',
    'nuxt-icon',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    'nuxt-bugsnag',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en', file: './lang/en.json' },
      { code: 'cs', iso: 'cs', file: './lang/cs.json' },
      { code: 'de', iso: 'de', file: './lang/de.json' },
      { code: 'es', iso: 'es', file: './lang/es.json' },
      { code: 'ru', iso: 'ru', file: './lang/ru.json' },
      { code: 'tr', iso: 'tr', file: './lang/tr.json' },
      { code: 'ua', iso: 'ua', file: './lang/ua.json' }
    ],
    defaultLocale: 'en'
  },
  site: {
    url: 'https://taxi2airport.cz'
  },
  sitemap: {
    autoI18n: true
  },
  formkit: {
    autoImport: true
  },
  headlessui: {
    prefix: 'Headless'
  },
  plugins: [{ src: '~/plugins/aos', mode: 'client' }],
  build: {
    transpile: ['vuetify']
  },
  // image: {
  //   domains: [
  //     'avatars0.githubusercontent.com'
  //   ],
  //   screens: {
  //     sm: 639,
  //     md: 867,
  //     lg: 1023,
  //     xl: 1279,
  //     rD: 1359,
  //     '2rD': 1439,
  //     xxl: 1599,
  //     '3xl': 1919
  //   },
  //   densities: [1, 2],
  //   format: ['webp'],
  //   quality: 80,
  //   provider: 'ipx'
  // },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },

  ssr: true,

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/images/favicon.png'
        },

        // Inter font
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
          rel: 'stylesheet'
        },
        // Poppins font
        {
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
          rel: 'stylesheet'
        },
        // MuseoModerno font
        {
          href: 'https://fonts.googleapis.com/css2?family=MuseoModerno:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap',
          rel: 'stylesheet'
        }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    public: {
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      SENDGRID_CLIENT_TEMPLATE_ID: process.env.SENDGRID_CLIENT_TEMPLATE_ID,
      MAPBOX_API_KEY: process.env.MAPBOX_TOKEN,
      RAPID_API_KEY: process.env.RAPID_API_KEY,
      TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
    }
  }
})
