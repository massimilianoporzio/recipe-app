<script lang="ts" setup>

</script>

<template>
  <header class="py-4 border-b">
    <nav class="flex container items-center">
      <NuxtLink
        to="/"
        class="flex gap-1 items-center"
      >
        <NuxtImg
          width="56px"
          densities="1x"
          format="webp"
          src="/icon-green.png"
          alt=""
        >
          <span class="text-3xl font-bold">Nuxtcipes</span>
        </nuxtimg></NuxtLink>
      <ul class="flex gap-6 ml-auto text-xl font-bold capitalize">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
