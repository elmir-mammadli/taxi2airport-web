<script setup lang="ts">
import { Switch } from '@headlessui/vue'
import SectionHeading from './SectionHeading.vue'
import { popularDestinations } from './data/popularDestinations'
import { type Currency, type DataPopularDestinationsTypes } from '~/types/PopularLocationsSectionTypes'

const isCzechCrowns = ref(false)

const returnPriceInSelectedCurrency = (price: Record<Currency, number>) => {
  if (!isCzechCrowns.value) {
    return price.czk + ' Kč'
  } else {
    return price.eur + ' €'
  }
}

const handleSelectedIcon = (selectedSender: string, item: Pick<DataPopularDestinationsTypes, 'name' | 'finalPrice'>) => {
  const message: string = `Hi, I would like to book the ride from Prague to ${item.name} (Price: ${returnPriceInSelectedCurrency(item.finalPrice)}). Is it possible?`
  const phoneNumber: string = `${selectedSender !== 'Whatsapp' ? '+' : ''}420773150831`
  const url: string = selectedSender === 'Whatsapp' ? 'https://wa.me' : 'https://t.me'
  const fullPath: string = `${url}/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(fullPath, '_blank')
}

</script>
<template>
  <div
    id="popular-locations"
    loading="lazy"
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-duration="600"
    class="flex flex-col items-center max-w-[1124px] mx-auto mt-24 -z-10 px-5 lg:px-0"
  >
    <SectionHeading
      section-title="popular-locations.header"
      section-subtitle="popular-locations.title"
    />

    <div class="md:ms-auto flex items-center gap-x-2 md:mr-2">
      <p
        class="font-normal"
        :class="[
          !isCzechCrowns ? 'text-gray-900': 'text-gray-400'
        ]"
      >
        Kč
      </p>
      <Switch
        v-model="isCzechCrowns"
        :class="isCzechCrowns ? 'bg-light-blue' : 'bg-light-blue'"
        class="relative inline-flex h-6 w-11 items-center rounded-full"
      >
        <span class="sr-only">Enable notifications</span>
        <span
          :class="isCzechCrowns ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition"
        />
      </Switch>
      <p
        class="font-normal"
        :class="[
          isCzechCrowns ? 'text-gray-900': 'text-gray-400'
        ]"
      >
        EUR
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-x-10 gap-y-5 mt-4">
      <PopularLocationsBlock
        v-for="item in popularDestinations"
        :key="item.id"
        :item="item"
        :change-currency="isCzechCrowns"
        @selected-icon="handleSelectedIcon($event, item)"
      />
    </div>
  </div>
</template>
