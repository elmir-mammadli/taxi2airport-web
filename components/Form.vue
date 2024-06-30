<template>
  <div
    id="bookForm"
    class="max-w-[1024px] mx-auto flex justify-center scroll-mt-20 mb-6 mt-10 md:mt-20 px-5"
  >
    <ReservationData :chapter="chapter" />
  </div>
  <div
    class="relative px-5 mx-auto"
    :class="[
      shakerState ? 'shake outline outline-blue-100' : '',
      chapter === 1 ? 'max-w-[1124px]' : 'max-w-[1040px]'
    ]"
  >
    <LoadingSpinner
      size="60"
      :class="[
        loading ? 'absolute z-30 inset-0 m-auto' : 'hidden'
      ]"
    />
    <form
      class="border-[1px] mx-auto border-custom-blue shadow-md border-opacity-60 mt-10 p-6 rounded-lg"
      :class="[
        shakerState ? 'shake outline outline-blue-100' : '',
        chapter === 1 ? 'max-w-[1124px]' : 'max-w-[1024px]',
        loading ? 'blur-sm z-10 pointer-events-none' : ''
      ]"
      @submit.prevent="submitForm"
    >
      <section
        v-if="chapter === 1"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 md:gap-x-12">
          <div class="mb-4">
            <label
              for="from"
              class="mb-3 text-sm font-medium text-black opacity-[0.87]"
            >{{ $t('form.from') }}</label>
            <AddressComplete
              v-model="formData.from"
              name="from"
              @address-selected="
                returnSelectedAddressFrom(
                  $event.display_name,
                  $event.coordinates
                )
              "
            />
            <small v-if="disabled" class="text-red-500">Addresses should not match</small>
            <p v-if="selectedAddress">
              Selected Address: {{ selectedAddress }}
            </p>
          </div>
          <div class="mb-4">
            <label
              label
              for="to"
              class="mb-3 text-sm font-medium text-black opacity-[0.87]"
            >{{ $t('form.to') }}</label>
            <AddressComplete
              v-model="formData.to"
              name="to"
              @address-selected="
                returnSelectedAddressTo($event.display_name, $event.coordinates)
              "
            />
            <small v-if="disabled" class="text-red-500">Addresses should not match</small>
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
          <div class="sm:hidden lg:flex items-end w-full">
            <Button
              :label="$t('form.search-button')"
              :loading="loading"
              :disabled="disabled"
              icon="pi pi-check"
              class="w-full h-12 text-[16px] bg-custom-blue hover:bg-lig  p-2 text-white mt-8 lg:mt-0"
              @click="chapterChange"
            />
          </div>
        </div>
      </section>
      <!-- Chapter 2 -->
      <section
        v-if="chapter === 2"
      >
        <div
          class="flex flex-col md:flex-row w-full justify-center md:gap-x-[24px]"
        >
          <div
            class="bg-gray-100 rounded-lg hidden md:flex flex-col max-w-[275px] w-full px-4 py-4"
            :class="[
              loading ? 'blur-sm z-10 pointer-events-none' : ''
            ]"
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
                <p
                  v-html="
                    item.value.substring(0, 19) +
                      (formData.to === item.value || formData.from === item.value
                        ? '...'
                        : '')
                  "
                />
              </div>
            </div>
          </div>
          <div class="">
            <div class="space-y-[24px] w-full">
              <CarModel
                :eta="eta"
                :loading-state="loading"
                :price="calculatePrice"
                @car-selected="updateSelectedCar"
              />
            </div>
            <button
              class="sm:hidden outline w-full mt-4 text-black opacity-[0.87] font-semibold text-[18px] px-8 py-2 md:py-4 rounded-md transition .4s ease-all"
              @click="chapter = 1"
            >
              Back
            </button>
          </div>
        </div>
      </section>
      <section
        v-if="chapter === 3"
      >
        <div
          class="grid grid-cols-1 grid-rows-1 md:grid-cols-3 md:grid-rows-2 gap-x-8 w-full text-sm"
        >
          <div class="relative mb-4">
            <FormKit
              v-model="formData.firstName"
              :label="$t('form.name')"
              type="text"
              name="firstName"
              validation="required|alpha"
              placeholder="John"
              label-class="font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px] group-data-[invalid]:ring-2 group-data-[invalid]:ring-red-500 group-data-[invalid]:border-none focus-within:!border-light-blue focus-within:!ring-light-blue focus-within:ring-1"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400"
            />
          </div>
          <div class="relative mb-4">
            <FormKit
              v-model="formData.lastName"
              :label="$t('form.surname')"
              type="text"
              name="lastName"
              validation="required|alpha"
              placeholder="Doe"
              label-class=" font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px] group-data-[invalid]:ring-2 group-data-[invalid]:ring-red-500 group-data-[invalid]:border-none focus-within:!border-light-blue focus-within:!ring-light-blue focus-within:ring-1"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
            />
          </div>
          <div class="mb-4">
            <FormKit
              v-model="formData.email"
              :label="$t('form.email')"
              validation="required|email"
              type="email"
              name="email"
              placeholder="john.doe@mail.com"
              class="w-full p-2 rounded-[8px] border"
              label-class=" font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px] group-data-[invalid]:ring-2 group-data-[invalid]:ring-red-500 group-data-[invalid]:border-none focus-within:!border-light-blue focus-within:!ring-light-blue focus-within:ring-1"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
            />
          </div>
          <div class="mb-4">
            <FormKit
              v-model="formData.phoneNumber"
              type="tel"
              label="Phone number"
              validation="required|number"
              class="w-full p-2 rounded-[8px] border"
              label-class=" font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px] mb-1 group-data-[invalid]:ring-2 group-data-[invalid]:ring-red-500 group-data-[invalid]:border-none focus-within:!border-light-blue focus-within:!ring-light-blue focus-within:ring-1"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
            />
          </div>
          <div class="mb-4">
            <div class="relative">
              <FormKit
                v-model="formData.flightNumber"
                type="text"
                label="Flight number"
                name="flightNumber"
                validation="required"
                placeholder="BA1594"
                label-class="font-semibold text-black opacity-[0.87] text-sm"
                inner-class="$reset w-full border-[#CCCCCC] border-opacity-[0.87] border-[1px] rounded-lg mt-[4px] mb-1 group-data-[invalid]:ring-2 group-data-[invalid]:ring-red-500 group-data-[invalid]:border-none focus-within:!border-light-blue focus-within:!ring-light-blue focus-within:ring-1"
                input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:rounded-md focus:border-custom-blue"
                :help="flightInputSmall"
                class="relative"
                :class="{
                  'focus:ring-1 focus:ring-red-500 ring-1 ring-red-500':
                    !isFlightNumber
                }"
                @input="fetchFlightsData"
              />
              <Icon
                v-if="isLoading"
                class="absolute text-[16px] top-10 right-2"
                name="svg-spinners:90-ring-with-bg"
              />
            </div>
          </div>
          <div class="mb-4">
            <div class="relative">
              <label
                for="childSeat"
                class="font-semibold text-black opacity-[0.87] text-sm"
              >Payment method</label>
              <div class="flex md:flex-col mt-1 gap-x-5 gap-y-2">
                <div
                  v-for="category in categories"
                  :key="category.key"
                  class="flex items-center"
                >
                  <RadioButton
                    v-model="formData.paymentMethod"
                    :input-id="category.key"
                    name="dynamic"
                    :value="category.name"
                    class="outline rounded-xl outline-[#CCCCCC]"
                  />
                  <label :for="category.key" class="ml-2 text-[15px]">{{
                    category.name
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="mb-4 flex flex-col justify-start gap-y-1">
            <label class="mb-2 text-sm font-medium text-black opacity-[0.87]">{{
              $t('form.child-seat')
            }}</label>
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
              class="w-full text-[16px] bg-custom-blue hover:bg-opacity-85 p-3 md:p-2 text-white md:mt-7"
              @click="chapterChange"
            />
          </div>
        </div>
      </section>
      <section
        v-if="chapter === 4"
      >
        <div class="bg-white rounded-lg w-full md:px-4 md:pt-0 md:pb-4">
          <h1 class="text-center font-semibold mb-6">
            {{ $t('form.booking-details') }}
          </h1>
          <div>
            <div class="grid grid-cols-1 md:grid-cols-3 md:gap-[2px]">
              <div
                v-for="booking in bookingItems"
                :key="booking.key"
                class="border-[1px] md:border-gray-600 md:bg-gray-100 p-2 md:p-4 md:rounded-sm"
              >
                <div>
                  <p class="font-semibold">
                    {{ booking.key }}
                  </p>
                  <p v-html="booking.value" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex md:flex-row flex-col-reverse max-w-[915px] mx-auto items-center sm:items-start md:items-center justify-between mt-4 md:mt-8 gap-y-4 md:gap-y-0"
        >
          <div>
            <Recaptcha
              :disabled="disabled"
              :error-callback="handleErrorCallback"
              :handle-load-callback="handleLoadCallback as () => void"
            />
            <small v-if="disabled" class="text-red-500">Please complete the reCAPTCHA</small>
          </div>
          <div
            class="flex flex-col sm:flex-row gap-y-4 md:gap-y-0 sm:gap-x-2 w-full md:w-[400px]"
          >
            <Button
              label="Back"
              icon="pi pi-check"
              class="w-full text-[16px] bg-white hover:bg-opacity-85 p-2 md:mt-0 border !border-custom-blue !text-custom-blue"
              @click="chapterBack"
            />
            <Button
              label="Finish booking"
              type="submit"
              icon="pi pi-check"
              class="w-full text-[16px] bg-custom-blue hover:bg-opacity-85 p-3 md:p-2 text-white md:mt-0"
            />
          </div>
        </div>
      </section>
      <section v-if="chapter === 5">
        <div class="flex flex-col items-center justify-center">
          <Icon
            name="material-symbols:check-circle-rounded"
            size="7em"
            color="#24a148"
          />
          <h1 class="text-center font-semibold text-[24px] mt-4">
            Thank you for choosing our service!
          </h1>
          <p class="text-center max-w-[680px] font-medium text-gray-500 mt-2">
            We have successfully received your booking details, and a
            confirmation message has been sent to your email inbox. We will
            contact you shortly.
          </p>
          <Button class="mt-4" @click="reloadWindow">
            <span
              class="text-[14px] text-custom-blue font-semibold hover:underline"
            >
              Back to homepage
            </span>
          </Button>
        </div>
      </section>
      <div v-if="chapter === 4" class="flex sm:hidden items-start mt-2">
        <p class="text-gray-600 text-sm md:text-base" v-html="$t('tcpp')" />
      </div>
    </form>
    <div
      class="flex flex-col md:flex-row items-end text-sm md:text-base mt-2 gap-y-2"
      :class="[
        chapter === 1 ? 'max-w-[1124px]' : 'max-w-[1024px]',
        chapter === 4 ? 'md:justify-between' : 'justify-end'
      ]"
    >
      <div v-if="chapter === 4" class="hidden md:flex items-start">
        <p class="text-gray-600" v-html="$t('tcpp')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
// ignore the error below
import { changeLocale } from '@formkit/vue'
import AddressComplete from './AddressComplete.vue'
import TravelBundle from './form/TravelBundle.vue'
import { type FormDataVariables } from './data/formData'
import ReservationData from './ReservationData.vue'
import Recaptcha from './Recaptcha.vue'
import { useShakeStore } from '~/stores/useShakeStore'

const shakeStore = useShakeStore()

const shakerState = computed(() => {
  return shakeStore.shouldShakeForm
})

const { $t, locale } = useLanguage()

const reloadWindow = () => {
  chapter.value = 1
  window.location.reload()
}

const chapter = ref(1)
const config = useRuntimeConfig()
const disabled = ref(false)
const loading = ref(false)
const todaysDateForAPI = new Date().toISOString().split('T')[0]

const isFlightNumber = ref(true)
const flightInfo = ref('')
const isLoading = ref(false)
const recaptchaVerified = ref(false)
const recaptchaToken = ref('')

const handleErrorCallback = () => {
  console.error('Error with ReCaptcha')
}

const handleLoadCallback = (response: unknown) => {
  // eslint-disable-next-line no-console
  console.log('ReCaptcha loaded', response)
  recaptchaVerified.value = true
  recaptchaToken.value = response as string
  disabled.value = false
}

const updateSelectedCar = (carName: string, extraPrice: number, isBlur: boolean) => {
  formData.selectedCar = carName
  formData.finalPrice = extraPrice
  loading.value = isBlur
  if (!isBlur) {
    chapter.value += 1
  }
}

const selectedAddress = ref('')
const pickupDate = ref(new Date())
const pickupTime = ref(new Date())
const checked = ref(false)

const categories = [
  { key: 'cash', name: 'BY CASH ON ARRIVAL' },
  { key: 'card', name: 'BY CARD ON ARRIVAL' }
]

const formattedDate = computed(() => {
  return new Date(pickupDate.value).toISOString().split('T')[0]
})

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
    return (distance - 20) * 1.5
  } else {
    return 0
  }
})

const reactiveFromCoordinates = ref<number[]>([])
const reactiveToCoordinates = ref<number[]>([])

const formData: FormDataVariables = reactive({
  from: '',
  to: '',
  formattedDate: '',
  formatTime: '',
  passengers: '',
  luggage: '',
  selectedCar: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  flightNumber: '',
  paymentMethod: '',
  finalPrice: 0,
  checked: false,
  coordinates: {
    fromCoordinates: [],
    toCoordinates: []
  }
})
const addressShouldNotMatch = () => {
  const from = formData.from
  const to = formData.to

  if (from === to) {
    disabled.value = true
  } else {
    disabled.value = false
  }
}

watch(
  () => [formData.from, formData.to],
  () => {
    addressShouldNotMatch()
  })

// In order to avoid circular references
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
    key: $t('form.to').toUpperCase(),
    value: formData.to
  },
  {
    key: 'Distance',
    value: `${haversineResult.value} km`
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
  },
  {
    key: $t('form.child-seat').toUpperCase(),
    value: isChildSeat.value
  },
  {
    key: $t('form.selected-car').toUpperCase(),
    value: formData.selectedCar
  }
])

const itemsSchedule = computed(() => [
  ...bookingItems.value.slice(6, bookingItems.value.length - 3)
])

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
}

const isApiSubscriptionEnded = ref(false)

const fetchFlightsData = async () => {
  const dynamicFlightNumber = formData.flightNumber
  try {
    const res = await fetch(
      `https://aerodatabox.p.rapidapi.com/flights/number/${dynamicFlightNumber}/${todaysDateForAPI}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': config.public.RAPID_API_KEY,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        }
      }
    )
    const fetchedData = await res.json()
    const data = fetchedData[0]
    if (data) {
      isLoading.value = true
      setTimeout(() => {
        isFlightNumber.value = true
        isLoading.value = false
        flightInfo.value = `${data.airline.icao}, ${data.airline.name}, ${data.departure.airport.name}`
        if (res.status === 403) {
          isApiSubscriptionEnded.value = true
        }
      }, 1000)
    } else {
      isFlightNumber.value = false
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}

// Temporary solution for displaying flight info is disabled, will be enabled after resolving API payment issues with site owner

// const flightInputSmall = computed(() => {
//   return !isFlightNumber.value ? 'Entered flight number does not exist' : (isApiSubscriptionEnded.value ? 'API subscription ended' : flightInfo.value)
// })

watch(
  () => formData.flightNumber,
  async () => {
    await fetchFlightsData()
  }
)

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
      !formData.flightNumber ||
      !formData.paymentMethod
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

const submitToClient = async () => {
  const messageToClient = {
    personalizations: [
      {
        to: [
          {
            email: formData.email,
            name: 'Learn to edit dynamic templates'
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
          childSeat: isChildSeat.value
        }
      }
    ],
    template_id: 'd-f825ae80a73f4c988e0a289fdf6bef92',
    from: { email: 'booking@taxi2airport.cz' }
  }
  const response = await useFetch('/api/sendgrid', {
    method: 'POST',
    body: JSON.stringify(messageToClient)
  })

  if (response.status.value === 'success') {
    chapter.value++
  }
}

const submitToDriver = async () => {
  const messageToDriver = {
    personalizations: [
      {
        to: [
          {
            email: 'hackrecaz@gmail.com'
          }
        ],
        dynamic_template_data: {
          name: formData.firstName,
          surname: formData.lastName,
          from: formData.from,
          to: formData.to,
          distance: haversineResult.value,
          date: formattedDate.value,
          time: formatTime.value,
          luggage: formData.luggage,
          selectedCar: formData.selectedCar,
          flightNumber: formData.flightNumber,
          number: formData.phoneNumber,
          email: formData.email,
          passengers: formData.passengers,
          childSeat: isChildSeat.value,
          paymentMethod: formData.paymentMethod,
          price: formData.finalPrice
        }
      }
    ],
    template_id: 'd-3e1185fe161847d988cb8ea9cff3a7b3',
    from: { email: 'booking@taxi2airport.cz' }
  }
  await useFetch('/api/sendgrid', {
    method: 'POST',
    body: JSON.stringify(messageToDriver)
  })
}

const submitForm = async () => {
  if (!recaptchaVerified.value) {
    disabled.value = true
    return
  }

  loading.value = true

  try {
    await submitToClient()
    await submitToDriver()
  } catch (error) {
    console.error('Error submitting form', error)
  } finally {
    loading.value = false
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

onMounted(() => {
  changeLocale(locale.value)
})
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
