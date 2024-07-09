<template>
  <div class="relative">
    <input
      v-model="query"
      class="w-full border rounded-lg !border-black h-[55px] mt-1 group-data-[invalid]:ring-2 group-data-[invalid]:ring-red-500 group-data-[invalid]:border-none focus-within:!border-light-blue focus-within:!ring-light-blue focus-within:ring-2"
      type="text"
      :placeholder="$t('form.address-placeholder')"
      :required="true"
      @input="autopredict"
    >
    <div
      v-if="addresses.length && (addresses.length || popularLocations.length)"
      class="absolute rounded border bg-white p-2 max-w-[510px] w-full mt-4 z-30"
      :class="{
        'h-[303px]' : query.length <= 3,
      }"
    >
      <Icon
        v-if="addressLoader && query.length <= 3"
        class="text-[72px] absolute inset-0 m-auto"
        name="svg-spinners:90-ring-with-bg"
      />
      <div v-if="!addressLoader && query.length <= 3">
        <div
          v-for="(popular, index) in popularLocations"
          :key="index"
          class="p-2 border-b cursor-pointer"
          @click="selectedAddress(popular)"
        >
          <div>
            <span class="font-bold">
              <Icon class="mr-1" :name="popular.icon" />
            </span>
            <span>{{ popular.display_name }}</span>
          </div>
        </div>
      </div>
      <div v-if="!addressLoader">
        <div
          v-for="(address, index) in addresses"
          :key="index"
          class="p-2 border-b cursor-pointer"
          @click="selectedAddress(address)"
        >
          {{ address.display_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

const config = useRuntimeConfig()
const emit = defineEmits(['address-selected', 'update:modelValue'])
const query = ref('')
const addressLoader = ref(false)

type PopularLocations = {
  icon: string;
  display_name: string;
  coordinates: Array<number>;
}

type PartialLocations = Partial<PopularLocations>

const coordinates = ref<Pick<PopularLocations, 'coordinates'>[]>([])
const addresses = ref<Pick<PopularLocations, 'display_name'>[]>([])

const popularLocations: PopularLocations[] = [
  {
    icon: 'ph:airplane-tilt',
    display_name: 'Prague Airport PRG (Václav Havel Airport)',
    coordinates: [14.2638025, 50.1042955]
  },
  {
    icon: 'ph:bank',
    display_name: 'Prague City Centre (Václavské náměstí)',
    coordinates: [14.427477, 50.0818262]
  },
  {
    icon: 'ph:bus',
    display_name: 'Praha, ÚAN Florenc (Central Bus Station Florenc)',
    coordinates: [14.440543, 50.090029]
  },
  {
    icon: 'ph:train',
    display_name: 'Praha, Hlavní nádraží (Main Train Station)',
    coordinates: [14.4353, 50.0829]
  }
]

const autopredict = async () => {
  if (!query.value) {
    addresses.value = []
    return
  }
  addressLoader.value = true
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query.value}.json`,
      {
        params: {
          access_token: config.public.MAPBOX_API_KEY,
          countries: 'CZ',
          limit: 3,
          autocomplete: true,
          language: 'en'
        }
      }
    )
    addresses.value = response.data.features.map(
      (feature: { place_name: string; center: Array<number> }) => ({
        display_name: feature.place_name,
        coordinates: feature.center
      })
    )
    setInterval(() => {
      addressLoader.value = false
    }, 500)
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

const selectedAddress = (address: PartialLocations) => {
  query.value = address.display_name ?? ''
  addresses.value = []
  if (address.coordinates) {
    coordinates.value.push({ coordinates: address.coordinates })
  }

  emit('address-selected', address)
}

watch(query, (newQuery) => {
  emit('update:modelValue', newQuery)
})
</script>
