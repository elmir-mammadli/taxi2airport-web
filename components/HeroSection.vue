<template>
    <div class="max-w-screen-xl mx-auto mt-10 md:mt-16">
        <div
        class="relative flex flex-row md:justify-between items-center px-5">
            <div 
            class="flex flex-col items-start sm:items-center md:items-start justify-center">
                <h1
                v-html="$t('hero.title')"
                class="text-[42px] md:text-[54px] lg:text-[72px] font-bold max-w-xl text-black opacity-[0.87] leading-[48px] md:leading-[64px] lg:leading-[80px]" />
                <p 
                v-html="$t('hero.subtitle')"
                class="mt-4 max-w-xl text-black opacity-[0.87] font-normal text-[20px]"/>
                <div 
                class="flex gap-x-5">
                    <button 
                    @click="triggerShake" 
                    class="bg-custom-blue text-white font-semibold text-[18px] px-9 py-3 rounded-xl mt-8 hover:bg-opacity-80 transition .4s ease-all">
                        {{ $t('button-2') }}
                  </button>
                  <NuxtLink to="#faq">
                    <button class="bg-[#fff] text-custom-blue outline outline-custom-blue font-medium text-[18px] px-9 py-3 rounded-xl mt-8 transition .4s ease-all">
                    FAQ
                </button>
                  </NuxtLink>
                </div>
            </div>
            <div>
                <span 
                class="relative">
                    <img
                    class="hidden md:block relative" src="/images/hero_vector1.svg" width="540" alt="hero-img" />
                </span>
            </div>
        </div>
        <Form />
    </div>
</template>
<script setup lang="ts">
import Form from './Form.vue';

import { useShakeStore } from '../stores/useShakeStore'
const shakeStore = useShakeStore()
function triggerShake() {
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
