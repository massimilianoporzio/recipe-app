/*
 *   Copyright (c) 2025 Massimiliano Porzio
 *   All rights reserved.
 */
// ...nothing here, just remove the stray tag...
<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import type { Recipe } from '~~/types/types'
import { logger } from '../../logger-frontend'
import { ref } from 'vue'

const config = useRuntimeConfig()
const siteUrl = 'https://recipe-app.massimilianoporzio.com/'
const { id } = useRoute().params
const recipe = ref<Recipe | null>(null)
let error = null

try {
  const res = await useFetch<Recipe>(`https://dummyjson.com/recipes/${id}`)
  recipe.value = res.data.value || null
  error = res.error
  if (error.value) {
    logger.error('Errore fetch ricetta: ' + (error.value.statusMessage || 'Errore generico'))
    throw createError({
      statusCode: error.value.statusCode || 500,
      statusMessage: error.value.statusMessage || 'An error occurred while fetching the recipe.'
    })
  }
}
catch (err) {
  logger.error('Eccezione fetch ricetta: ' + err)
}

if (recipe.value) {
  const recipeTitle = recipe.value.name || 'Recipe'
  // ---
  // Genera una description di almeno 100 caratteri concatenando più istruzioni se necessario
  let recipeDescription = ''
  if (Array.isArray(recipe.value.instructions) && recipe.value.instructions.length > 0) {
    const descArr = []
    let totalLen = 0
    for (const instr of recipe.value.instructions) {
      if (instr && typeof instr === 'string') {
        descArr.push(instr)
        totalLen += instr.length
        if (totalLen >= 100) break
      }
    }
    recipeDescription = descArr.join(' ')
  }
  // Se ancora troppo corta, usa la appDescription o una fallback
  if (!recipeDescription || recipeDescription.length < 100) {
    const fallback = String(config.public.appDescription || 'Discover the easiest way to cook with our curated recipes!')
    recipeDescription = recipeDescription
      ? (recipeDescription + ' ' + fallback).slice(0, 300)
      : fallback
  }
  // ---
  const recipeImage = recipe.value.image
    ? (recipe.value.image.startsWith('http') ? recipe.value.image : siteUrl.replace(/\/$/, '') + recipe.value.image)
    : siteUrl + 'favicon.svg'
  const recipeUrl = `${siteUrl}recipes/${id}`
  const canonicalUrl = recipeUrl
  // Data di pubblicazione fissa per tutte le ricette (ora di questa richiesta)
  const publishedTime = '2025-09-02T10:00:00.000Z' // Sostituisci con la data/ora attuale
  const siteName = 'Recipe App'
  const twitterHandle = '@massimilianoporzio' // Cambia con il tuo handle reale se ne hai uno
  const articleTags = (recipe.value.ingredients || []).slice(0, 3).map(tag => ({
    property: 'article:tag',
    content: tag
  }))

  useSeoMeta({
    title: recipeTitle,
    description: recipeDescription,
    ogTitle: recipeTitle,
    ogDescription: recipeDescription,
    ogImage: recipeImage,
    ogUrl: recipeUrl,
    twitterTitle: recipeTitle,
    twitterDescription: recipeDescription,
    twitterImage: recipeImage,
    twitterCard: 'summary_large_image',
    author: 'Massimiliano Porzio',
    ogType: 'article',
    ogSiteName: siteName,
    twitterSite: twitterHandle,
    twitterCreator: twitterHandle
  })

  useHead({
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        property: 'article:published_time',
        content: publishedTime
      },
      {
        property: 'article:section',
        content: recipe.value.cuisine || 'Recipe'
      },
      ...articleTags
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Recipe',
          'name': recipeTitle,
          'image': recipeImage,
          'author': {
            '@type': 'Person',
            'name': 'Massimiliano Porzio'
          },
          'datePublished': publishedTime,
          'description': recipeDescription,
          'recipeIngredient': recipe.value.ingredients || [],
          'recipeInstructions': recipe.value.instructions || []
        })
      }
    ]
  })
}
</script>

<template>
  <div class="flex flex-col max-w-screen-lg container py-20">
    <!-- Header -->
    <div class="flex flex-col mb-6">
      <h2 class="text-5xl mb-4 font-semibold">
        {{ recipe?.name }}
      </h2>
      <div class="flex gap-4 text-xl mb-6">
        <div class="flex items-center gap-1">
          <Icon
            name="mdi:clock-time-eight-outline"
            style="color: #f79f1a"
          />
          <span>{{ recipe?.cookTimeMinutes }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon
            name="mdi:fire"
            style="color: #f79f1a"
          />
          <span>{{ recipe?.caloriesPerServing }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon
            name="mdi:star"
            style="color: #f79f1a"
          />
          <span>{{ recipe?.rating }} ({{ recipe?.reviewCount }})</span>
        </div>
      </div>
      <hr>
    </div>

    <!-- Image -->
    <NuxtImg
      :src="recipe?.image"
      densities="x1"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw"
      class="w-full max-h-[500px] object-cover rounded-md shadow-sm mb-12"
      alt=""
    />

    <!-- Ingredients -->
    <div class="mb-8">
      <h2 class="text-3xl font-semibold mb-4">
        Ingredients
      </h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-lg">
        <li
          v-for="ingredient in recipe?.ingredients"
          :key="ingredient"
        >
          <label class="flex gap-2 items-center">
            <input
              class="hidden peer"
              type="checkbox"
            >
            <div
              class="relative w-6 h-6 rounded-full border-2 border-dodgeroll-gold flex items-center justify-center peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-dodgeroll-gold peer-checked:after:rounded-full"
            />
            <span class="peer-checked:line-through">
              {{ ingredient }}
            </span>
          </label>
        </li>
      </ul>
    </div>

    <!-- Instructions -->
    <div>
      <h2 class="text-3xl font-medium mb-4">
        Instructions
      </h2>
      <ul class="flex flex-col text-lg gap-4">
        <li
          v-for="(instruction, index) in recipe?.instructions"
          :key="index"
          class="flex gap-2"
        >
          <span
            class="flex items-center justify-center bg-dodgeroll-gold w-7 h-7 rounded-full text-white text-sm"
          >
            {{ index + 1 }}
          </span>
          <span class="flex-1">{{ instruction }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
