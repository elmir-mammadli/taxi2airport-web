<script setup lang="ts">
const { locale: lang } = useLanguage()
</script>

<template>
  <main class="my-40">
    <div class="max-w-[1024px] mx-auto text-justify leading-[28px]">
      <ContentDoc v-if="lang === 'en'" path="/privacy-policy" />
      <ContentDoc v-if="lang === 'cs'" path="/zasady-zpracovani-udaju" />
    </div>
  </main>
</template>
