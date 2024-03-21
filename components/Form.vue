<template>
    <div class="max-w-[992px] mx-auto flex justify-between mb-6 mt-20">
    <div v-for="(step, index) in reservationData" :key="index" class="flex flex-col md:flex-row items-center">
        <div :class="[
          chapter > index ? 'bg-green-500' : 'bg-green-200'
          ]" class="w-8 h-8 rounded-full flex items-center font-semibold justify-center text-white">
            {{ index + 1 }}
        </div>
        <div class="flex-grow h-1 bg-gray-400 mx-2"></div>
        <div>
            {{ step.step }}
        </div>
        <div v-if="index !== reservationData.length - 1" class="h-[1px] bg-gray-400 w-[150px] mx-4"></div>
    </div>
</div>
<form
    @submit.prevent="submitForm"
    class="max-w-[1024px] outline-4 mx-auto bg-orange-400 mt-10 p-6 rounded-lg"
    :class="{
      'shake outline outline-blue-100': shakerState
    }"
    >
<section v-if="chapter === 1">
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
      <div class="mb-4">
          <label for="from" class="block mb-2 text-sm font-medium text-white">{{ $t('form.from') }}</label>
          <AdressComplete 
          v-model="formData.from" 
          type="text" 
          name="from" 
          class="w-full p-2 rounded-[8px]" 
          @address-selected="returnSelectedAddressFrom($event.display_name, $event.coordinates)"
          />
          <p v-if="selectedAddress">Selected Address: {{ selectedAddress }}</p>
    </div>
    <div class="mb-4">
      <label label for="to" class="block mb-2 text-sm font-medium text-white">{{ $t('form.to') }}</label>
      <AdressComplete 
      v-model="formData.to" 
      class="w-full p-2 rounded-[8px]" 
      type="text"
      name="to" 
      @address-selected="returnSelectedAddressTo($event.display_name, $event.coordinates)"
      />
          <p v-if="selectedAddress">Selected Address: {{ selectedAddress }}</p>
    </div>
    </div>
    <div class="flex flex-col md:flex-row md:items-end md:gap-x-12 w-full">
      <div class="flex flex-col md:flex-row gap-x-4 md:items-end w-full">
        <div>
          <FormKit
          v-model="formData.formattedDate"
          type="date"
          :value="requiredDate('today')"
          :label="$t('form.date')"
          validation="required"
          placeholder="DD/MM/YYYY"
          outer-class="$reset"
          wrapper-class="$reset"
          label-class="block font-semibold text-white text-sm"
          inner-class="$reset bg-white outline-none rounded-lg"
          input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400"
          messages-class="absolute bottom-[5px] text-red-500 text-[10px]"
          />
      </div>
      <div>
        <FormKit
          v-model="formData.formatTime"
          type="time"
          value="12:00"
          :label="$t('form.time')"
          wrapper-class="$reset"
          outer-class="$reset"
          label-class="block font-semibold text-white text-sm"
          inner-class="$reset bg-white outline-none rounded-lg"
          input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400"
          />
      </div>
        <div>
        <label label for="passengers" class="block mb-2 text-sm font-medium text-white">{{ $t('form.passengers') }}</label>
        <InputText id="passengers" v-model="formData.passengers" type="number" name="passengers" class="w-[80px] p-2 rounded-[8px]"  placeholder="0" />
        </div>
      <div class="flex justify-center items-end gap-x-3">
        <div>
        <label for="luggage" class="block mb-2 text-sm font-medium text-white">{{ $t('form.luggage') }}</label>
        <InputText v-model="formData.luggage" type="number" name="luggage" class="w-[80px] p-2 rounded-[8px]" placeholder="0" />
        </div>
      </div>
      </div>
      <div class="w-full">
        <Button @click="chapterChange" :label="$t('form.search-button')" :loading="loading" icon="pi pi-check" class="w-full text-[16px] bg-green-500 hover:bg-green-600 p-2 text-white" />
      </div>
    </div>
</section>
<!-- Chapter 2 -->
<section v-if="chapter === 2">
  <div class="flex justify-between space-x-[24px]">
    <div class="bg-gray-100 rounded-lg flex flex-col max-w-[275px] w-full px-4 py-4">
      <span class="relative">
        <h1 class="text-left font-semibold">YOUR TRANSFER</h1>
        <span @click="chapter = 1" class="absolute rounded-lg cursor-pointer border border-black px-3 py-1 text-[10px] font-semibold right-0 top-0">
          EDIT
      </span>
      </span> 
        <div v-for="(item, index) in itemsSchedule" :key="index">
              <div class="flex flex-col mt-3">
            <p class="font-semibold">
              {{ item.key }}
            </p>
            <p v-html="item.value"/>
        </div>
        </div>
    </div>

    <div>
      <div class="space-y-[24px] w-full">
        <CarModel :loading="loading"  :price="calculatePrice"  @car-selected="updateSelectedCar" />
      </div>
    </div>
  </div>
</section>
<section v-if="chapter === 3">
    <div class="grid grid-cols-3 grid-rows-2 gap-x-8 w-full">
      <div class="relative mb-4">
      <label for="firstName" class="block mb-2 text-sm font-medium text-white">{{ $t('form.name') }}</label>
      <InputText required v-model="formData.firstName" type="text" name="firstName" placeholder="John" class="w-full p-2 rounded-[8px]" />
      </div>
      <div class="mb-4">
      <label for="firstName" class="block mb-2 text-sm font-medium text-white">{{ $t('form.surname') }}</label>
      <InputText v-model="formData.lastName" type="text" name="lastName" placeholder="Doe" class="w-full p-2 rounded-[8px]" />
      </div>
      <div class="mb-4">
      <label for="email" class="block mb-2 text-sm font-medium text-white">{{ $t('form.email') }}</label>
      <InputText v-model="formData.email" type="text" name="email" placeholder="john.doe@mail.com" class="w-full p-2 rounded-[8px]" />
      </div>
      <div class="mb-4">
      <label for="phoneNumber" class="block mb-2 text-sm font-medium text-white">{{ $t('form.number') }}</label>
      <InputText v-model="formData.phoneNumber" type="tel" autofocus name="phoneNumber" placeholder="+1 (123) 456-7890" class="w-full p-2 rounded-[8px]" />
      </div>
      <div class="mb-4">
      <label for="flightNumber" class="block mb-2 text-sm font-medium text-white">{{ $t('form.flight-number') }}</label>
      <InputText v-model="formData.flightNumber" type="text" name="flightNumber" placeholder="BA1594" class="w-full p-2 rounded-[8px]" />
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="mb-4 flex flex-col justify-start gap-y-1">
          <label for="childSeat" class="block mb-2 text-sm font-medium text-white">{{ $t('form.child-seat') }}</label>
          <div class="flex items-center gap-x-2">
            <Checkbox v-model="checked" :binary="true"/>
            <p class="text-white">{{ $t('form.child-seat-p') }}</p>
          </div>
      </div>
    <div class="flex mb-4 gap-x-2">
        <Button label="Back" @click="chapterBack" icon="pi pi-check" class="w-full bg-red-500 hover:bg-red-600 text-[16px] p-2 text-white mt-7" />
        <Button label="Next" :loading="loading" @click="chapterChange" icon="pi pi-check" class="w-full bg-green-500 hover:bg-green-600 text-[16px] p-2 text-white mt-7" />
      </div>
    </div>
  </section>
  <section v-if="chapter === 4">
    <div class="bg-white rounded-lg w-full p-4">
      <h1 class="text-center font-semibold mb-4">{{ $t('form.booking-details') }}</h1>
      <div>
          <table class="border-collapse w-full">
            <tbody>
              <tr v-for="index in 2" :key="index">
                  <td class="border border-gray-100 p-3" v-for="booking in bookingItems.slice((index-1)*6, index*6)" :key="booking.key">
                      <div>
                          <p class="font-semibold">
                              {{ booking.key }}
                          </p>
                          <p v-html="booking.value"/>
                      </div>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-x-2">
            <Checkbox v-model="isAgreed" :binary="true"/>
            <p v-html="$t('tcpp')" class="text-white" />
          </div>
      <div class="flex gap-x-2 mb-4 w-[400px]">
        <Button label="Back" @click="chapter--" icon="pi pi-check" class="w-full bg-red-500 hover:bg-red-600 p-2 text-white mt-7" />
        <Button label="Finish booking" type="submit" icon="pi pi-check" class="w-full bg-green-500 hover:bg-green-600 p-2 text-white mt-7" />
      </div>
    </div>
  </section>
  </form>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from "primevue/button/Button.vue";
import AdressComplete from './AdressComplete.vue';
import CarModel from './CarModel.vue';
import Checkbox from 'primevue/checkbox/Checkbox.vue';
import type { FormDataVariables } from './data/formData';
import { useEventBus } from '@vueuse/core'
import { formData } from './data/formData';
import axios from 'axios';
import mapboxgl, { type Coordinate } from 'mapbox-gl';


import { useShakeStore } from '~/stores/useShakeStore';
const shakeStore = useShakeStore()

const shakerState = computed(() => {
  return shakeStore.shouldShakeForm
})

const { $t } = useLanguage()



const requiredDate = (date: string) => {
  if (date === 'minDate') {
    return `required|date_after:${new Date().toISOString().split('T')[0]}`;
  } else if (date === 'today') {
    return new Date().toISOString().split('T')[0];
  } else {
    return '';
  }
};

const currentDate = new Date();
const formattedCountDate = currentDate.getFullYear().toString() +
  (currentDate.getMonth() + 1).toString().padStart(2, '0') +
  currentDate.getDate().toString().padStart(2, '0');



const reservationData = computed(() => [
  {
    step: $t('reservation.step-1')
  },
  {
    step: $t('reservation.step-2')
  },
  {
    step: $t('reservation.step-3')
  },
  {
    step: $t('reservation.step-4')
  },
])
const selectedAddress = ref('');
const pickupDate = ref(new Date())
const pickupTime = ref(new Date())
const checked = ref(false)
const isAgreed = ref(false)

const formattedDate = computed(() => {
  let day = String(pickupDate.value.getDate()).padStart(2, '0')
  let month = String(pickupDate.value.getMonth() + 1).padStart(2, '0')
  let year = pickupDate.value.getFullYear()

  return `${day}.${month}.${year}`
})

const formatTime = computed(() => {
  let hours = String(pickupTime.value.getHours()).padStart(2, '0')
  let minutes = String(pickupTime.value.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
})
const isChildSeat = computed(() => checked.value ? 'Yes' : 'No')
const bookingItems = computed(() => [
  {
    key: $t('form.name'),
    value: formData.firstName
  },
  {
    key: $t('form.surname'),
    value: formData.lastName
  },
  {
    key: $t('form.email'),
    value: formData.email
  },
  {
    key: $t('form.number'),
    value: formData.phoneNumber
  },
  {
    key: $t('form.selected-car'),
    value: formData.selectedCar
  },
  {
    key: $t('form.flight-number'),
    value: formData.flightNumber
  },
  {
    key: $t('form.from').toUpperCase(),
    value: formData.from
  },
  {
    key: 'Distance',
    value: `${haversineResult.value} km`
  },
  {
    key: $t('form.to').toUpperCase(),
    value: formData.to
  },
  {
    key: $t('form.date').toUpperCase(),
    value: formattedDate.value
  },
  {
    key: $t('form.time').toUpperCase(),
    value: formatTime.value
  },
  {
    key: $t('form.passengers').toUpperCase(),
    value: formData.passengers
  },
  {
    key: $t('form.luggage').toUpperCase(),
    value: formData.luggage
  },
])

const itemsSchedule = computed(() => [...bookingItems.value.slice(6, 12)])
const fromTo = computed(() => [...bookingItems.value.slice(6, 8)])


const chapter = ref(1)
const config = useRuntimeConfig()
const loading = ref(false)
const updateSelectedCar = (carName: string) => {
  formData.selectedCar = carName
  chapter.value += 1
}
const chapterChange = async () => {
  loading.value = true
    setTimeout(() => {
      chapter.value ++
      loading.value = false
    }, 1500)
  }
  const chapterBack = () => {
    chapter.value--
  }
const submitForm = async () => {
    try {
      const response = await axios.post(
        'https://api.sendgrid.com/v3/mail/send',
        {
          personalizations:[
            {
              to: [
                { 
                  email: formData.email, 
                  name: 'Learn to edit dynamic templates'
                }
              ],
              cc: [
                {}
              ],
              dynamic_template_data: {
                name: formData.firstName,
                surname: formData.lastName,
                from: formData.from,
                to: formData.to,
                date: formattedDate.value,
                time: formatTime.value,
                luggage: formData.luggage,
                selectedCar: formData.selectedCar,
                flightNumber: formData.flightNumber,
                number: formData.phoneNumber,
                email: formData.email,
                passengers: formData.passengers,
                childSeat: isChildSeat.value,
                orderCount: formattedCountDate
              }
              // cc: [{ email: 'hackrecaz@gmail.com' }],
              // subject: `${formData.firstName} ${formData.lastName} - ${$t('form.booking-details')}`
            }
          ],
          template_id: 'd-f825ae80a73f4c988e0a289fdf6bef92',
          from: { email: 'booking@taxi2airport.cz' }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.public.SENDGRID_API_KEY}`
          }
        }
      );
      chapter.value++
    }
    catch (error) {
      console.error('Error submitting error', error);
    }
  }

  const reactiveFromCoordinates = ref<number[]>([])
  const reactiveToCoordinates = ref<number[]>([])
  const returnSelectedAddressFrom = async (display_name: string, coordinates: number[]) => {
  console.log('Received Coordinates:', coordinates);

  formData.from = display_name;
  formData.coordinates.fromCoordinates = coordinates;
  reactiveFromCoordinates.value = coordinates;
  console.log('Updated FormData From', formData.from, 'Coordinates:', formData.coordinates.fromCoordinates);

  // Log formData after it has been updated
  console.log('FormData output after updating from:', formData.coordinates.fromCoordinates[0]);
  console.log('FormData output after updating from:', formData.coordinates.fromCoordinates[1]);

  const fromCoordinates = new mapboxgl.LngLat(formData.coordinates.fromCoordinates[0], formData.coordinates.fromCoordinates[1]);
  console.log('FromCoordinates:', fromCoordinates);
}


const returnSelectedAddressTo = async (display_name: string, coordinates: number[]) => {
  console.log('Received Coordinates:', coordinates);

  formData.to = display_name;
  formData.coordinates.toCoordinates = coordinates;
  reactiveToCoordinates.value = coordinates;
  console.log('Updated FormData To', formData.to, 'Coordinates:', formData.coordinates.toCoordinates);

  // Log formData after it has been updated
  console.log('FormData output after updating to:', formData);

  console.log('FormData output after updating from:', formData.coordinates.toCoordinates[0]);
  console.log('FormData output after updating from:', formData.coordinates.toCoordinates[1]);
}

  function haversineDistance(fromLat: number, fromLng: number, toLat: number, toLng: number) {
    const R = 6371; // Radius of the earth in km
    const p1 = fromLat * (Math.PI / 180);
    const p2 = toLat * (Math.PI / 180);

    const deltaLon = toLng - fromLng;
    const deltaLambda = (deltaLon * Math.PI) / 180;

    const distance = Math.acos(Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda)) * R;
    return distance;
  }

  
  const haversineResult = computed(() => {
    return `${haversineDistance(reactiveFromCoordinates.value[0], reactiveFromCoordinates.value[1], reactiveToCoordinates.value[0], reactiveToCoordinates.value[1]).toFixed(0)}`
  })

  const calculatePrice = computed(() => {
    const distance = Number(haversineResult.value);
    if (distance > 20) {
      return (distance - 20) * 34
    } else {
      return 0;
    }
  });

</script>

<style scoped lang="scss">
.calendar {
  input {
    border-radius: 8px;
  };
  .calendar-timeonly {
    input {
      border-radius: 8px;
    }
  }
}

.p-dropdown-items-wrapper {
  padding-left: 12px;
}

.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>
