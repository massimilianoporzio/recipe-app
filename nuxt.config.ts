// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: ['@nuxthub/core', '@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/icon', '@nuxt/image'],

  // https://devtools.nuxt.com
  devtools: { enabled: true },

  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: 'Hello from the Edge 👋'
    }
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-01',

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {},

  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  // google fonts
  googleFonts: {
    families: {
      Montserrat: true
    }
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'dodgeroll-gold': '#f79f1a',
            'apple-green': '#046e1b',
            'dire-wolf': '#292727'

          }
        },
        fontFamily: {
          Montserrat: ['Montserrat', 'sans-serif']
        },
        container: {
          center: true,
          padding: '2rem'
        }
      }
    }
  }
})
