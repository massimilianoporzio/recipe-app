/*
 *   Copyright (c) 2025 Massimiliano Porzio
 *   All rights reserved.
 */
<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import type { RecipesResponse } from '../..//types/types'
import { logger } from '../logger-frontend'

let recipesData: RecipesResponse | null = null
type FetchError = { statusMessage?: string }
let fetchError: FetchError | null = null
try {
  const { data, error } = await useFetch<RecipesResponse>('https://dummyjson.com/recipes?limit=12')
  recipesData = data.value ?? null
  fetchError = error.value as FetchError | null
  if (fetchError) {
    logger.error('Errore fetch ricette: ' + (fetchError.statusMessage || 'Errore generico'))
  }
  else {
    logger.info('Fetch ricette ok')
  }
}
catch (err) {
  logger.error('Eccezione fetch ricette: ' + err)
}
const config = useRuntimeConfig()
const siteTitle = String(config.public.appName || 'Master the Kitchen with Ease')
const siteDescription = String(config.public.appDescription || 'Discover recipes helping you to find the easiest way to cook.')
const siteUrl = 'https://recipe-app.massimilianoporzio.com/'
const siteImage = '/nuxt-course-hero.png'

const firstRecipe = recipesData?.recipes?.[0]
useSeoMeta({
  title: siteTitle,
  description: siteDescription,
  ogTitle: siteTitle,
  ogDescription: siteDescription,
  ogImage: firstRecipe?.image || siteImage,
  ogUrl: siteUrl,
  twitterTitle: siteTitle,
  twitterDescription: siteDescription,
  twitterImage: firstRecipe?.image || siteImage,
  twitterCard: 'summary'
})
</script>

<template>
  <main>
    <section class="bg-[#f1f1f1]">
      <div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
        <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <h1 class="text-4xl lg:text-6xl font-extrabold mb-6 text-balance">
            Master the Kitchen with Ease: Unleash Your Inner Chef Today!
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-balance">
            Discover recipes helping you to find the easiest way to cook.
          </p>
          <button
            class="px-4 py-2 text-white self-start bg-dodgeroll-gold rounded-md text-lg cursor-pointer"
          >
            Browse Recipes
          </button>
        </div>
        <div class="flex-1 order-1 lg:order-2">
          <NuxtImg
            src="/nuxt-course-hero.png"
            alt=""
            sizes="xs:100vw, sm:667px"
            format="webp"
            densities="1x"
          />
        </div>
      </div>
    </section>
    <section class="py-20 container">
      <h2 class="text-3xl lg:text-5xl mb-2">
        Discover, Create, Share
      </h2>
      <p class="text-lg lg:text-xl mb-8">
        Check out our most popular recipes!
      </p>
      <div
        v-if="!fetchError"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8"
      >
        <div
          v-for="recipe in recipesData?.recipes"
          :key="recipe.id"
          class="flex flex-col shadow rounded-md"
        >
          <NuxtImg
            :src="recipe.image"
            sizes="xs:100vw, sm:50vw, lg:400px"
            densities="1x"
            format="webp"
            alt=""
            class="rounded-t-md"
          />
          <div class="flex flex-col py-6 px-4 flex-1">
            <p class="text-xl lg:text-2xl font-semibold mb-2">
              {{ recipe.name }}
            </p>
            <div class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-4 mt-auto">
              <div class="flex items-center gap-1">
                <Icon
                  name="mdi:clock-time-eight-outline"
                  style="color: #f79f1a"
                />
                <span>{{ recipe.cookTimeMinutes }} min</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon
                  name="mdi:fire"
                  style="color: #f79f1a"
                />
                <span>{{ recipe.caloriesPerServing }} cal</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon
                  name="mdi:star"
                  style="color: #f79f1a"
                />
                <span>{{ recipe.rating }} ({{ recipe.reviewCount }})</span>
              </div>
            </div>
            <NuxtLink
              :to="`recipes/${recipe.id}`"
              class="px-4 py-2 text-white self-start bg-dodgeroll-gold rounded-md text-base lg:text-lg cursor-pointer"
            >
              View
            </NuxtLink>
          </div>
        </div>
      </div>
      <p
        v-else
        class="text-red-500 text-xl text-center font-bold"
      >
        Opps something went wrong. Please try again later.
      </p>
    </section>
  </main>
</template>
