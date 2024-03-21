// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '~/assets/css/main.css',
    '@mdi/font/css/materialdesignicons.min.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
  ],
  modules: [
    "@nuxt/image",
    "nuxt-primevue",
    'nuxt-headlessui',
    'nuxt-icon',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    'nuxt-bugsnag',
    "@formkit/nuxt",
    '@pinia/nuxt',
    ['@storyblok/nuxt', {
      accessToken: '7uGbKtUY7gZBqUSkvoACzwtt'
    }]
  ],
  i18n: {
    vueI18n: './plugins/i18n.config.ts',
  },
  headlessui: {
    prefix: 'Headless'
  },
  svgo: {
    componentPrefix: 'Icon'
  },
  plugins: [
  { src: '~/plugins/aos', mode: 'client' },
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  app:{
    head: {
      link: [
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
      ],
      script: [
        {
          hid: 'tawkto',
          src: 'https://embed.tawk.to/65381772a84dd54dc484c68a/1hdhhn65v',
          defer: true,
          crossorigin: 'anonymous',
        }
    ]
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {
    provider: 'imagekit',
    imagekit: {
      baseURL: 'https://ik.imagekit.io/transfervan'
    }
  },
  runtimeConfig: {
    public: {
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      MAPBOX_API_KEY: process.env.MAPBOX_TOKEN
    }
  }
})