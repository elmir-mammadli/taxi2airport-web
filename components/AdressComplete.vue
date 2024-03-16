<template>
  <div class="relative">
    <InputText
      class="w-full"
      type="text"
      v-model="query"
      @input="autopredict"
      required
      :placeholder="$t('form.address-placeholder')"
    />
    <div
      class="bg-white rounded border p-2 max-w-[510px] mt-4 z-30" 
      v-if="addresses.length && (addresses.length || popularLocations.length)">
      <div
        class="p-2 border-b cursor-pointer"
        v-for="(popular, index) in popularLocations"
        :key="index"
        @click="selectedAddress(popular)"
        v-if="query.length <= 3"
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
import InputText from 'primevue/inputtext/InputText.vue';
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
  { icon: 'ph:airplane-tilt', display_name: "Prague Airport (PRG)", coordinates: [50.1000, 14.2600]},
  { icon: 'ph:bank', display_name: "Prague City Centre (Václavské náměstí)", coordinates: [50.0833, 14.4167]},
  { icon: 'ph:bus', display_name: "Praha, ÚAN Florenc (Central Bus Station Florenc)", coordinates: [50.0900, 14.4400]},
  { icon: 'ph:train', display_name: "Praha, Hlavní nádraží (Main Train Station)", coordinates: [50.0833, 14.4333]}
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
        console.error('Fetch error:Elmir', error);
    }
}

// const selectedAddress = (address: any) => {
//     query.value = address.display_name;
//     addresses.value = [];
//     coordinates.value = address.coordinates;
//     emit('address-selected', address);

//     // Example usage of mapboxgl haversine formula
//     const originCoordinates = new mapboxgl.LngLat(address.coordinates[0], address.coordinates[1]); // Example: New York coordinates
//   const selectedCoordinates = new mapboxgl.LngLat(address.coordinates[0], address.coordinates[1]);
//   const distanceInKm = originCoordinates.distanceTo(selectedCoordinates) / 1000; // Convert meters to kilometers
//   const roundedDistance = distanceInKm.toFixed(0); // Round to the nearest whole number
//   console.log('Distance:', roundedDistance, 'km');
  
// };
type PartialLocations = Partial<PopularLocations>

const selectedAddress = (address: PartialLocations ) => {
    query.value = address.display_name ?? '';
    addresses.value = [];
    if (address.coordinates) {
      coordinates.value.push({ coordinates: address.coordinates });
    }

    emit('address-selected', address);
};




watch(query, (newQuery) => {
      emit('update:modelValue', newQuery);
   });
</script>