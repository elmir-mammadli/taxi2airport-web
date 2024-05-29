<template>
  <div
    id="bookForm"
    class="max-w-[992px] mx-auto flex justify-center scroll-mt-20 mb-6 mt-20 px-5"
  >
    <ReservationData :chapter="chapter" />
  </div>
  <div class="px-5">
    <form
      class="max-w-[1024px] border-[1px] mx-auto border-[#000000] border-opacity-90 mt-10 p-6 rounded-lg"
      :class="{
        'shake outline outline-blue-100': shakerState
      }"
      @submit.prevent="submitForm"
    >
      <section v-if="chapter === 1">
        <div class="grid grid-cols-1 lg:grid-cols-2 md:gap-x-12">
          <div class="mb-4">
            <label for="from" class="block mb-2 text-sm font-medium text-black opacity-[0.87]">{{ $t('form.from') }}</label>
            <AddressComplete
              v-model="formData.from"
              type="text"
              name="from"
              class="w-full p-2 rounded-[8px]"
              @address-selected="returnSelectedAddressFrom($event.display_name, $event.coordinates)"
            />
            <p v-if="selectedAddress">
              Selected Address: {{ selectedAddress }}
            </p>
          </div>
          <div class="mb-4">
            <label label for="to" class="block mb-2 text-sm font-medium text-black opacity-[0.87]">{{ $t('form.to') }}</label>
            <AddressComplete
              v-model="formData.to"
              class="w-full p-2 rounded-[8px]"
              type="text"
              name="to"
              @address-selected="returnSelectedAddressTo($event.display_name, $event.coordinates)"
            />
            <p v-if="selectedAddress">
              Selected Address: {{ selectedAddress }}
            </p>
          </div>
          <div
            class="flex flex-col md:flex-row md:items-end gap-y-4 md:gap-x-12 w-full"
          >
            <div class="flex flex-col md:flex-row gap-4 md:items-end w-full">
              <TravelBundle
                v-model="formData"
                :loading="loading"
                @emitted-chapter="chapterChange"
              />
            </div>
          </div>
          <div class="block sm:hidden lg:flex items-end w-full">
            <Button
              :label="$t('form.search-button')"
              :loading="loading"
              icon="pi pi-check"
              class="w-full h-12 text-[16px] bg-custom-blue hover:bg-opacity-85 p-2 text-white mt-8 lg:mt-0"
              @click="chapterChange"
            />
          </div>
        </div>
      </section>
      <!-- Chapter 2 -->
      <section v-if="chapter === 2">
        <div
          class="flex flex-col md:flex-row w-full justify-center md:gap-x-[24px]"
        >
          <div
            class="bg-gray-100 rounded-lg hidden md:flex flex-col max-w-[275px] w-full px-4 py-4"
          >
            <span class="relative">
              <h1 class="text-left font-semibold">YOUR TRANSFER</h1>
              <span
                class="absolute rounded-lg cursor-pointer border border-black px-3 py-1 text-[10px] font-semibold right-0 top-0"
                @click="chapter = 1"
              >
                EDIT
              </span>
            </span>
            <div v-for="(item, index) in itemsSchedule" :key="index">
              <div class="flex flex-col mt-3">
                <p class="font-semibold">
                  {{ item.key }}
                </p>
                <p v-html="item.value.substring(0, 19) + (formData.to === item.value || formData.from === item.value ? '...' : '')" />
              </div>
            </div>
          </div>
          <div class="">
            <div class="space-y-[24px] w-full">
              <CarModel
                :loading="loading"
                :eta="eta"
                :price="calculatePrice"
                @car-selected="updateSelectedCar"
              />
            </div>
            <button
              class="sm:hidden outline w-full mt-4 text-black opacity-[0.87] font-semibold text-[18px] px-8 py-4 rounded-md transition .4s ease-all"
              @click="chapter = 1"
            >
              Back
            </button>
          </div>
        </div>
      </section>
      <section v-if="chapter === 3">
        <div
          class="grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-rows-2 gap-x-8 w-full"
        >
          <div class="relative mb-4">
            <FormKit
              v-model="formData.firstName"
              :label="$t('form.name')"
              type="text"
              name="firstName"
              :message="!formData.firstName ? 'First name is required' : ''"
              placeholder="John"
              label-class="block font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px]"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
            />
          </div>
          <div class="mb-4">
            <FormKit
              v-model="formData.lastName"
              :label="$t('form.name')"
              type="text"
              name="lastName"
              :message="!formData.lastName ? 'First name is required' : ''"
              placeholder="Doe"
              label-class="block font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px]"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
            />
          </div>
          <div class="mb-4">
            <FormKit
              v-model="formData.email"
              :label="$t('form.email')"
              validation="required|email"
              :validation-messages="{
                matches: 'Phone number must be in the format xxx-xxx-xxxx',
              }"
              validation-visibility="dirty"
              type="email"
              name="email"
              placeholder="john.doe@mail.com"
              class="w-full p-2 rounded-[8px] border"
              label-class="block font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px]"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
            />
          </div>
          <div class="mb-4">
            <FormKit
              type="tel"
              label="Phone number"
              placeholder="xxx-xxx-xxx"
              validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/"
              :validation-messages="{
                matches: 'Phone number must be in the format xxx-xxx-xxx',
              }"
              validation-visibility="dirty"
              class="w-full p-2 rounded-[8px] border"
              label-class="block font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px] mb-1"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
            />
          </div>
          <div class="mb-4">
            <label
              for="flightNumber"
              class="block mb-2 text-sm font-medium opacity-[0.87]"
              :class="[!isFlightNumber ? 'text-red-500' : 'text-black']"
            >{{ $t('form.flight-number') }}</label>
            <div class="relative">
              <InputText
                v-model="formData.flightNumber"
                type="text"
                name="flightNumber"
                placeholder="BA1594"
                class="w-full p-2 rounded-[8px] border"
                :class="{
                  'focus:ring-1 focus:ring-red-500 ring-1 ring-red-500':
                    !isFlightNumber
                }"
                @input="fetchFlightsData"
              />
              <Icon
                v-if="isLoading"
                class="absolute text-[16px] top-3 right-2"
                name="svg-spinners:90-ring-with-bg"
              />
              <Icon
                v-if="!isFlightNumber"
                class="absolute text-[16px] top-3 right-2 text-red-500"
                name="ic:baseline-error"
              />
            </div>
            <small
              v-if="!isFlightNumber"
              class="text-red-500"
            >Entered flight number does not exists</small>
            <small
              v-if="isFlightNumber"
              class=""
            >{{ flightInfo }}</small>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="mb-4 flex flex-col justify-start gap-y-1">
            <label
              for="childSeat"
              class="block mb-2 text-sm font-medium text-black opacity-[0.87]"
            >{{ $t('form.child-seat') }}</label>
            <div class="flex items-center gap-x-2">
              <Checkbox
                v-model="checked"
                :binary="true"
                class="outline rounded-md outline-offset-1 outline-blue-black"
              />
              <p class="text-black opacity-[0.87]">
                {{ $t('form.child-seat-p') }}
              </p>
            </div>
          </div>
          <div class="flex flex-col md:flex-row mb-4 gap-x-2 gap-y-4">
            <Button
              label="Back"
              icon="pi pi-check"
              class="w-full text-[16px] bg-white hover:bg-opacity-85 p-2 md:mt-7 border !border-custom-blue !text-custom-blue"
              @click="chapterBack"
            />
            <Button
              label="Next"
              :loading="loading"
              icon="pi pi-check"
              class="w-full text-[16px] bg-custom-blue hover:bg-opacity-85 p-2 text-white md:mt-7"
              @click="chapterChange"
            />
          </div>
        </div>
      </section>
      <section v-if="chapter === 4">
        <div class="bg-white rounded-lg w-full p-4">
          <h1 class="text-center font-semibold mb-4">
            {{ $t('form.booking-details') }}
          </h1>
          <div>
            <table class="border-collapse w-full">
              <tbody>
                <tr v-for="index in 2" :key="index">
                  <td
                    v-for="booking in bookingItems.slice(
                      (index - 1) * 6,
                      index * 6
                    )"
                    :key="booking.key"
                    class="border border-gray-100 p-3"
                  >
                    <div>
                      <p class="font-semibold">
                        {{ booking.key }}
                      </p>
                      <p v-html="booking.value" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4 mx-4">
          <div class="flex items-center">
            <Checkbox
              v-model="isAgreed"
              class="outline rounded-md outline-blue-black me-2"
              :binary="true"
            />
            <p class="text-black opacity-[0.87]" v-html="$t('tcpp')" />
          </div>
          <div class="flex gap-x-2 w-[400px]">
            <Button
              label="Back"
              icon="pi pi-check"
              class="w-full text-[16px] bg-white hover:bg-opacity-85 p-2 border !border-custom-blue !text-custom-blue"
              @click="chapterBack"
            />
            <Button
              label="Finish booking"
              type="submit"
              :loading="loading"
              icon="pi pi-check"
              class="w-full text-[16px] bg-custom-blue hover:bg-opacity-85 p-2 text-white"
            />
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button/Button.vue'
import Checkbox from 'primevue/checkbox/Checkbox.vue'
import axios from 'axios'
import AddressComplete from './AddressComplete.vue'
import CarModel from './CarModel.vue'
import TravelBundle from './form/TravelBundle.vue'
import { formData } from './data/formData'
import ReservationData from './ReservationData.vue'

import { useShakeStore } from '~/stores/useShakeStore'
const shakeStore = useShakeStore()

const shakerState = computed(() => {
  return shakeStore.shouldShakeForm
})

const { $t } = useLanguage()

const currentDate = new Date()

const formattedCountDate = computed(() => {
  return (
    currentDate.getFullYear().toString() +
    (currentDate.getMonth() + 1).toString().padStart(2, '0') +
    currentDate.getDate().toString().padStart(2, '0')
  )
})

const selectedAddress = ref('')
const pickupDate = ref(new Date())
const pickupTime = ref(new Date())
const checked = ref(false)
const isAgreed = ref(false)

const formattedDate = computed(() => {
  const day = String(pickupDate.value.getDate()).padStart(2, '0')
  const month = String(pickupDate.value.getMonth() + 1).padStart(2, '0')
  const year = pickupDate.value.getFullYear()

  return `${day}.${month}.${year}`
})
// new Date().toISOString().split('T')[0]

const formatTime = computed(() => {
  const hours = String(pickupTime.value.getHours()).padStart(2, '0')
  const minutes = String(pickupTime.value.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
})

const isChildSeat = computed(() => (checked.value ? 'Yes' : 'No'))

const haversineResult = computed(() => {
  return `${haversineDistance(reactiveFromCoordinates.value[0], reactiveFromCoordinates.value[1], reactiveToCoordinates.value[0], reactiveToCoordinates.value[1]).toFixed(0)}`
})

const eta = computed(() => {
  return `${(Number(haversineResult.value) / 60) * 60}`
})

const calculatePrice = computed(() => {
  const distance = Number(haversineResult.value)
  if (distance > 20) {
    return (distance - 20) * 34
  } else {
    return 0
  }
})

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
    value: formData.formattedDate
  },
  {
    key: $t('form.time').toUpperCase(),
    value: formData.formatTime
  },
  {
    key: $t('form.passengers').toUpperCase(),
    value: formData.passengers
  },
  {
    key: $t('form.luggage').toUpperCase(),
    value: formData.luggage
  }
])

const itemsSchedule = computed(() => [...bookingItems.value.slice(6, bookingItems.value.length)])

const chapter = ref(1)
const config = useRuntimeConfig()
const loading = ref(false)
const todaysDateForAPI = new Date().toISOString().split('T')[0]
const isFlightNumber = ref(true)
const flightInfo = ref('')
const isLoading = ref(false)

//  <div class="mb-4">
//           <label for="from" class="block mb-2 text-sm font-medium text-black opacity-[0.87]">{{ $t('form.from') }}</label>
//           <AddressComplete
//           v-model="formData.from"
//           type="text"
//           name="from"
//           class="w-full p-2 rounded-[8px]"
//           @address-selected="returnSelectedAddressFrom($event.display_name, $event.coordinates)"
//           />
//           <p v-if="selectedAddress">Selected Address: {{ selectedAddress }}</p>
//     </div>

const reactiveFromCoordinates = ref<number[]>([])
const reactiveToCoordinates = ref<number[]>([])
const returnSelectedAddressFrom = (
  displayName: string,
  coordinates: number[]
) => {
  formData.from = displayName
  formData.coordinates.fromCoordinates = coordinates
  reactiveFromCoordinates.value = coordinates
}

const returnSelectedAddressTo = (
  displayName: string,
  coordinates: number[]
) => {
  formData.to = displayName
  formData.coordinates.toCoordinates = coordinates
  reactiveToCoordinates.value = coordinates

  // Log formData after it has been updated
}

// const fetchFlightsData = async () => {
//   const dynamicFlightNumber: string = formData.flightNumber
//   // Options for the API request
//   const options = {
//     method: 'GET',
//     url: `https://aerodatabox.p.rapidapi.com/flights/number/${dynamicFlightNumber}/${todaysDateForAPI}`,
//     headers: {
//       'X-RapidAPI-Key': config.public.RAPID_API_KEY,
//       'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
//     }
//   }

//   try {
//     const departureIcao = ref('')
//     const departureName = ref('')
//     const departureCityName = ref('')
//     const departureStatus = ref('')

//     if (dynamicFlightNumber.length >= 6) {
//       const response = await axios.request(options)

//       isLoading.value = true

//       const filteredArrival = response.data.filter(
//         (item: {
//           arrival: {
//             airport: {
//               countryCode: string
//              }
//             }
//           }) =>
//           item.arrival.airport.countryCode === 'CZ'
//       )
//       console.log('FilteredArrival', filteredArrival[0])

//       departureIcao.value = response.data[0].airline.icao
//       departureName.value = response.data[0].airline.name
//       departureCityName.value = response.data[0].departure.airport.name
//       departureStatus.value = response.data[0].status

//       setTimeout(() => {
//         isFlightNumber.value = filteredArrival[0]
//         flightInfo.value = `${departureIcao.value}, ${departureName.value}, ${departureCityName.value}`
//         isLoading.value = false
//       }, 1000)

//       if (response.data[0].number === dynamicFlightNumber) {
//         formData.flightNumber = dynamicFlightNumber
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching flight data', error)
//   }
// }

const fetchFlightsData = async () => {
  const dynamicFlightNumber = formData.flightNumber
  try {
    const res = await axios.get(`https://aerodatabox.p.rapidapi.com/flights/number/${dynamicFlightNumber}/${formData.formattedDate}`, {
      headers: {
        'X-RapidAPI-Key': config.public.RAPID_API_KEY,
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
      }
    })
    const data = res.data[0]
    if (data) {
      isLoading.value = true
      setTimeout(() => {
        isFlightNumber.value = true
        isLoading.value = false
        flightInfo.value = `${data.airline.icao}, ${data.airline.name}, ${data.departure.airport.name}`
      }, 1000)
    } else {
      isFlightNumber.value = false
    }
  } catch (error) {
    console.log('Fetch error', error)
  } finally {
    loading.value = false
  }
}

watch(() => formData.flightNumber, async () => {
  await fetchFlightsData()
})

const updateSelectedCar = (carName: string) => {
  formData.selectedCar = carName
  chapter.value += 1
}
const chapterChange = () => {
  if (chapter.value === 1) {
    if (
      !formData.from ||
      !formData.to ||
      !formData.formattedDate ||
      !formData.formatTime ||
      !formData.passengers ||
      !formData.luggage
    ) {
      alert('Please fill in all the fields')
      return
    }
  } else if (chapter.value === 3) {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.flightNumber
    ) {
      alert('Please fill in all the fields')
      return
    }
  }

  loading.value = true
  setTimeout(() => {
    chapter.value++
    loading.value = false
  }, 1500)
}
const chapterBack = () => {
  chapter.value--
}

// Send message to TG channgel
const sendMessageToTelegram = async (message: any) => {
  const botToken = config.public.TELEGRAM_BOT_TOKEN
  const chatId = '+ntPwnPCz5P0xNzli' // Replace with your actual channel chat ID

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message
    })
    console.log('Message sent successfully')
  } catch (error) {
    console.error('Error sending message', error)
  }
}

// Example usage
const trimmedMessage = `
  New booking request:
  From: ${formData.from}
  To: ${formData.to}
  Date: ${formattedDate.value}
  Time: ${formatTime.value}
  Passengers: ${formData.passengers}
  Luggage: ${formData.luggage}
`

sendMessageToTelegram(trimmedMessage)
// End of code TG
const submitForm = async () => {
  try {
    await axios.post(
      'https://api.sendgrid.com/v3/mail/send',
      {
        personalizations: [
          {
            to: [
              {
                email: formData.email,
                name: 'Learn to edit dynamic templates'
              }
            ],
            cc: [
              {
                email: 'hackrecaz@gmail.com'
              }
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
          Authorization: `Bearer ${config.public.SENDGRID_API_KEY}`
        }
      }
    )
    chapter.value++
    const message = `
      New booking request:
      From: ${formData.from}
      To: ${formData.to}
      Date: ${formattedDate.value}
      Time: ${formatTime.value}
      Passengers: ${formData.passengers}
      Luggage: ${formData.luggage}
    `

    await sendMessageToTelegram(message)
  } catch (error) {
    console.error('Error submitting error', error)
  }
}

function haversineDistance (
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
) {
  const R = 6371 // Radius of the earth in km
  const p1 = fromLat * (Math.PI / 180)
  const p2 = toLat * (Math.PI / 180)

  const deltaLon = toLng - fromLng
  const deltaLambda = (deltaLon * Math.PI) / 180

  const distance =
    Math.acos(
      Math.sin(p1) * Math.sin(p2) +
        Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda)
    ) * R
  return distance
}
</script>

<style scoped lang="scss">
.calendar {
  input {
    border-radius: 8px;
  }
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
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
