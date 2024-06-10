<template>
  <div id="faq" class="w-full py-[120px] flex flex-col max-w-[880px] mx-auto">
    <div class="flex flex-col items-center mb-[40px]">
      <p class="uppercase text-[14px] md:text-[16px] text-custom-blue font-bold">
        Frequently Asked Questions
      </p>
      <h1
        class="text-[26px] md:text-[36px] max-w-xl text-gray-800 text-center font-semibold leading-[1.4] px-5 sm:px-0"
      >
        Your most common questions answered here
      </h1>
    </div>
    <div
      v-for="(q, index) in displayedQuestions"
      :key="index"
      class="mx-auto w-full max-w-4xl rounded-2xl bg-white p-2"
    >
      <Disclosure v-slot="{ open }" as="div">
        <DisclosureButton
          class="flex w-full items-center justify-between rounded-full bg-gray-100 px-6 py-5 text-left text-sm md:text-[18px] transition .4s ease-all font-medium text-gray-800 hover:bg-gray-200"
        >
          <span>
            {{ q.question }}
          </span>
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="size-6 text-gray-800"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-[14px] md:text-base text-gray-500">
          {{ q.answer }}
        </DisclosurePanel>
      </Disclosure>
    </div>
    <p v-if="showAssistance" class="ms-3 mt-5">
      Can't find an answer to your question? Start a chat with us for
      <span class="font-semibold underline"><a href="">assistance!</a></span>
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
import { questions } from './faqData'

const showAssistance = ref(false)
const showButton = ref(false)
const displayedQuestions = ref(questions.slice(0, 6))

const loadMore = () => {
  displayedQuestions.value = questions
  showButton.value = true
  showAssistance.value = true
}

const scrollToElement = () => {
  const element = document.getElementById('faq')
  element?.scrollIntoView({ behavior: 'smooth' })
}
onMounted(() => {
  scrollToElement()
})
</script>
