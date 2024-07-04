<script setup lang="ts">
// const { locale: lang } = useLanguage()

useSeoMeta({
  title: 'Reliable Airport Transfers | Taxi2Airport',
  ogTitle: 'Reliable Airport Transfers | Taxi2Airport',
  description: 'Book stress-free airport transfers with Taxi2Airport. Enjoy punctual, safe, and comfortable rides. Available 24/7 with competitive pricing.',
  ogDescription: 'Book stress-free airport transfers with Taxi2Airport. Enjoy punctual, safe, and comfortable rides. Available 24/7 with competitive pricing.',
  ogImage: '/images/og-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <main class="my-40">
    <div class="max-w-[1024px] mx-auto text-justify leading-[28px]">
      <ContentDoc path="/privacy-policy" />
      <!-- <ContentDoc v-if="lang === 'cs'" path="/zasady-zpracovani-udaju" /> -->
    </div>
  </main>
</template>
