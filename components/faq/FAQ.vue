<template>
  <div
    id="faq"
    loading="lazy"
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-duration="600"
    class="w-full py-[120px] flex flex-col max-w-[880px] mx-auto"
  >
    <SectionHeading
      section-title="faq.title"
      section-subtitle="faq.subtitle"
    />
    <div
      v-for="(q, index) in displayedQuestions"
      :key="index"
      class="mx-auto w-full max-w-4xl rounded-2xl bg-white py-2 px-5 md:px-2"
    >
      <Disclosure v-slot="{ open }" as="div">
        <DisclosureButton
          class="grid grid-flow-col-dense place-content-between place-items-center w-full rounded-lg bg-gray-100 px-6 py-5 text-left text-base md:text-[18px] transition .4s ease-all font-medium text-gray-800 hover:bg-gray-200"
        >
          <span>
            {{ q.question }}
          </span>
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="size-5 text-gray-800"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-base md:text-[16px] leading-6 text-gray-500">
          {{ q.answer }}
        </DisclosurePanel>
      </Disclosure>
    </div>
    <p v-if="showAssistance" class="md:ms-3 mt-10 px-5">
      Can't find an answer to your question? Start a chat with us for assistance via
      <NuxtLink to="https://wa.me/420773150831" target="_blank" class="font-semibold hover:underline">
        whatsapp
      </NuxtLink>
      or
      <NuxtLink to="https://t.me/+420773150831" class="font-semibold hover:underline">
        telegram
      </NuxtLink>
    </p>
    <div class="mx-auto">
      <button
        v-if="!showButton"
        class="text-gray-800 font-semibold text-[16px] mt-8 underline transition .4s ease-all"
        @click="loadMore"
      >
        More questions
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import SectionHeading from '../SectionHeading.vue'
import { questions } from './faqData'

const showAssistance = ref(false)
const showButton = ref(false)
const displayedQuestions = ref(questions.slice(0, 6))

const loadMore = () => {
  displayedQuestions.value = questions
  showButton.value = true
  showAssistance.value = true
}
</script>
