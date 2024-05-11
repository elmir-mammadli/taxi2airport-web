<template>
    <div class="bg-white page__wrap">
        <Aside />
        <Header />
      <slot />
      <Footer />
    </div>
  </template>

  <script lang="ts" setup> 
  import AOS from 'aos'
  import { useI18n } from 'vue-i18n';

  const { t: $t } = useI18n()
  
  onBeforeMount(() => {
    AOS.init()
  })
  </script>

  <style>
@media screen and (min-width: 120.0625em) {
  .page__wrap {
    box-shadow: 0 0 22px 0 rgba(0, 0, 0, 0.1);
  }
}

.page__wrap {
  font-family: 'Poppins', sans-serif;
  min-width: 300px;
  width: 100%;
}
  </style>