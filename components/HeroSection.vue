<template>
  <div loading="lazy" class="max-w-screen-xl mx-auto mt-10 md:mt-16">
    <div class="relative flex flex-row justify-center md:justify-between items-center px-5">
      <div
        class="flex flex-col items-start sm:items-center md:items-start justify-center"
      >
        <h1
          class="text-[42px] md:text-[54px] lg:text-[72px] font-bold max-w-xl text-black opacity-[0.87] leading-[48px] md:leading-[64px] lg:leading-[80px]"
          v-html="$t('hero.title')"
        />
        <p
          class="mt-4 max-w-xl text-black opacity-[0.87] font-normal text-[18px] md:text-[20px]"
          v-html="$t('hero.subtitle')"
        />
        <div class="hidden md:flex gap-x-5 items-center mt-9">
          <button
            class="bg-custom-blue text-white font-semibold text-[18px] px-9 py-[13px] rounded-[6px] hover:bg-opacity-80 transition .4s ease-all"
            @click="triggerShake"
          >
            {{ $t('button-2') }}
          </button>
          <NuxtLink to="#faq">
            <button
              class="bg-[#fff] text-custom-blue outline outline-custom-blue font-medium text-[18px] px-9 py-3 rounded-[6px] transition .4s ease-all"
            >
              FAQ
            </button>
          </NuxtLink>
        </div>
      </div>
      <div>
        <span class="relative">
          <NuxtImg src="/images/hero_vector.png" class="hidden md:block" width="540" alt="hero image" />
        </span>
      </div>
    </div>
    <Form />
  </div>
</template>
<script setup lang="ts">
import { useShakeStore } from '../stores/useShakeStore'
import Form from './Form.vue'

const shakeStore = useShakeStore()
function triggerShake () {
  shakeStore.triggerShake()
}
</script>

<style>
.ease-in-out-enter-from {
  @apply opacity-0;
}

.ease-in-out-enter-to {
  @apply opacity-100;
}

.ease-in-out-leave-active {
  @apply transition duration-200 ease-in-out;
}

.ease-in-out-leave-from {
  @apply opacity-100;
}

.ease-in-out-leave-to {
  @apply opacity-0;
}
</style>
