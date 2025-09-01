/*
 *   Copyright (c) 2025 Massimiliano Porzio
 *   All rights reserved.
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: ['@nuxthub/core', '@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/icon', '@nuxt/image'],

  // https://devtools.nuxt.com
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        // Example: use a Nuxt icon as favicon (SVG)
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      // App name and description (English)
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Master the Kitchen with Ease',
      appDescription: process.env.NUXT_PUBLIC_APP_DESCRIPTION || 'Discover the easiest way to cook with our curated recipes!'
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

  image: {
    domains: ['https://cdn.dummyjson.com']
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
