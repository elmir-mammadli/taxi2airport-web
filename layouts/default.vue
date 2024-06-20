<template>
  <div class="bg-white page__wrap">
    <!-- <Aside />
    <Header />
    <slot />
    <Footer /> -->
    <H1>DISABLED</H1>
  </div>
</template>

<script lang="ts" setup>
import AOS from 'aos'

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
  font-family: 'Rubik', sans-serif;
  min-width: 300px;
  width: 100%;
}

.prose a {
  color: #47ad00 !important;
}

.prose p,
.prose td {
  color: #292929;
}

.prose strong {
  color: #000;
}

.prose ol > li {
  color: #292929;
}

.prose ol > li::before {
  color: #595959;
}

.prose ul > li {
  color: #292929;
}

.prose ul > li::before {
  background-color: #bdc3cb;
}
</style>
