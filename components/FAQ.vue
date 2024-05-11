<template>
  <div id="faq" class="w-full py-[120px] flex flex-col max-w-[880px] mx-auto">
        <div class="flex flex-col items-center mb-[40px]">
            <p class="uppercase text-[16px] text-custom-blue font-bold">Frequently Asked Questions</p>
            <h1 class="text-[36px] max-w-xl text-gray-800 text-center font-semibold leading-[1.4]">Your most common questions answered here</h1>
        </div>
      <div 
      v-for="(q, index) in displayedQuestions" 
      :key="index"
      class="mx-auto w-full max-w-4xl rounded-2xl bg-white p-2">
        <Disclosure as="div" v-slot="{ open }">
          <DisclosureButton
            class="flex w-full justify-between rounded-full bg-gray-100 px-6 py-5 text-left text-[18px] transition .4s ease-all font-medium text-gray-800 hover:bg-gray-200"
          >
            <span>
                {{ q.question }}
            </span>
            <ChevronUpIcon
              :class="open ? 'rotate-180 transform' : ''"
              class="h-6 w-6 text-gray-800"
            />
          </DisclosureButton>
          <DisclosurePanel class="px-4 pt-4 pb-2 text-base text-gray-500">
            {{ q.answer }}
          </DisclosurePanel>
        </Disclosure>
      </div>
      <p v-if="showAssistance" class="ms-3 mt-5">Can't find an answer to your question? Start a chat with us for <span class="font-semibold underline"><a href="">assistance!</a></span></p>
      <div class="mx-auto">
            <button v-if="!showButton" @click="loadMore" class="text-gray-800 font-semibold text-[16px] mt-8 underline transition .4s ease-all">
                       More questions
                </button>
        </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { ChevronUpIcon } from '@heroicons/vue/20/solid'

  type Questions = {
    question: string;
    answer: string;
  }

  const questions: Questions[] = [
    {
        question: 'When do I pay?',
        answer: 'For most booking, you can either choose to pay in advance for your airport transport service or when you’re dropped at your hotel. If you’re paying in advance online, our driver will be informed by our system, and there’s nothing more you need to do. If you’re paying on arrival by cash or credit card, you’ll pay the full amount when you arrive at your destination.'
    },
    {
        question: 'Do I need to pay only in the local Czech Koruna currency (CZK)?',
        answer: 'Naturally we accept payment in the local CZK currency, but we also accept pounds sterling (GBP), US Dollars, Euros.'
    },
    {
        question: 'Are your prices per person or per vehicle?',
        answer: 'All our prices are per vehicle, not per person. The price you see on our website is the price you pay. There are no hidden extras.'
    },
    {
        question: 'Where do we meet our driver? How do we recognize our driver?',
        answer: 'When you arrive at the train station or Prague airport, our driver will be holding a visible orange card with our company logo and your lead passenger’s name printed on it. Click here for more information and photos about this.'
    },
    {
        question: 'What happens if my flight is delayed?',
        answer: 'Don’t worry! We monitor all flight schedules and adjust our pick-up times accordingly. If there’s a significant delay, our driver will still be there to greet you without any extra charges.'
    },
    {
        question: 'Can I cancel or modify my booking?',
        answer: 'Yes, you can modify or cancel your booking up to 24 hours before your scheduled pick-up. Any cancellations made within 24 hours may be subject to charges.'
    },
    {
        question: 'Is there a limit to the amount of luggage I can bring?',
        answer: 'Our standard vehicles can accommodate up to two large suitcases and two carry-on bags. If you have more luggage or special items like sports equipment, please inform us in advance so we can make the necessary arrangements.'
    },
    {
        question: 'Do you provide child seats or booster seats?',
        answer: 'Yes, we do provide child and booster seats upon request. Please mention the age and weight of your child during booking so we can ensure the appropriate seat is available.'
    },
    {
        question: 'How long will the driver wait for me after my plane lands?',
        answer: 'Our driver will wait for up to 60 minutes from the time your plane lands. If you anticipate a longer delay, please contact us as soon as possible to make alternative arrangements.'
    },
    {
        question: 'Do you offer services outside of Prague?',
        answer: 'Yes, we offer transportation services to various destinations outside of Prague. Please contact us with your desired destination for a custom quote.'
    },
    {
    question: 'Is tipping the driver mandatory?',
    answer: 'Tipping is not mandatory, but it’s a nice gesture if you’re satisfied with the service. The amount is at your discretion.'
    },
    {
        question: 'What if I have special requirements or need assistance during the journey?',
        answer: 'Please inform us at the time of booking about any special requirements or if you need assistance. Our drivers are trained to help and ensure you have a comfortable journey.'
    },
    {
        question: 'How do I get a receipt for my booking?',
        answer: 'After the payment is processed, a receipt will be sent to your registered email address. If you need a physical copy, please inform the driver or contact our customer service.'
    },
    {
        question: 'Can I share my ride with others to reduce costs?',
        answer: 'Currently, we offer private transfers only. However, you can split the cost with your co-travelers. For shared rides or carpooling options, please check our website for any new updates.'
    },
    {
        question: 'Do you have a loyalty program or discounts for frequent travelers?',
        answer: 'Yes, we value our loyal customers. We offer discounts and special deals for frequent travelers. Please sign up on our website to get notified about ongoing promotions and loyalty benefits.'
    }
]
const showAssistance = ref(false)
const showButton = ref(false)
const displayedQuestions = ref(questions.slice(0, 6));

const loadMore = () => {
  displayedQuestions.value = questions
  showButton.value = true
  showAssistance.value = true
}
  </script>  
