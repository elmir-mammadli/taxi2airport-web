<template>
  <div class="relative">
    <input
      class="w-full"
      type="text"
      v-model="query"
      @input="autopredict"
      :placeholder="$t('form.address-placeholder')"
      required
    />
    <div
      class="absolute bg-white rounded border p-2 max-w-[510px] mt-4 z-30" 
      v-if="addresses.length && (addresses.length || popularLocations.length)">
      <div
        class="p-2 border-b cursor-pointer"
        v-for="(popular, index) in popularLocations"
        :key="index"
        @click="selectedAddress(popular)"
        v-if="query.length <= 5"
      >
        <div>
          <span class="font-bold">
            <Icon 
            class="mr-1"
            :name="popular.icon"
            />
          </span>
          <span>{{ popular.display_name }}</span>
        </div>
      </div>
      <div
        class="p-2 border-b cursor-pointer"
        v-for="(address, index) in addresses"
        :key="index"
        @click="selectedAddress(address)"
      >
          {{ address.display_name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";
import mapboxgl from 'mapbox-gl'


const config = useRuntimeConfig()
const emit = defineEmits()
const query = ref('')
const coordinates = ref<Pick<PopularLocations, 'coordinates'>[]>([])
const addresses = ref<Pick<PopularLocations, 'display_name'>[]>([])

type PopularLocations = {
  icon: string;
  display_name: string;
  coordinates: Array<number>;
}

const popularLocations: PopularLocations[] = [
  { icon: 'ph:airplane-tilt', display_name: "Prague Airport PRG (Václav Havel Airport)", coordinates: [14.2638025, 50.1042955]},
  { icon: 'ph:bank', display_name: "Prague City Centre (Václavské náměstí)", coordinates: [14.427477, 50.0818262]},
  { icon: 'ph:bus', display_name: "Praha, ÚAN Florenc (Central Bus Station Florenc)", coordinates: [14.440543, 50.090029]},
  { icon: 'ph:train', display_name: "Praha, Hlavní nádraží (Main Train Station)", coordinates: [14.4353, 50.0829]}
];


const autopredict = async () => {  
    if (!query.value) {
        addresses.value = []
        return
    }
    try {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query.value}.json`,
            {
                params: {
                    access_token: config.public.MAPBOX_API_KEY,
                    countries: ['CZ'],
                    limit: 3,
                    autocomplete: true,
                    language: 'en',
                }
            },
        );
          addresses.value = response.data.features.map((feature: {place_name: string, center: Array<number>}) => ({
            display_name: feature.place_name,
            coordinates: feature.center,
        })
        )
        
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

type PartialLocations = Partial<PopularLocations>

const selectedAddress = (address: PartialLocations ) => {
    query.value = address.display_name ?? '';
    addresses.value = [];
    if (address.coordinates) {
      coordinates.value.push({ coordinates: address.coordinates });
      console.log('asdsad', coordinates.value);
      
    }

    emit('address-selected', address);
};




watch(query, (newQuery) => {
      emit('update:modelValue', newQuery);
   });
</script>
