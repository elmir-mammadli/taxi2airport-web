<template>
  <div class="flex flex-col md:flex-row gap-4 md:items-end w-full">
    <div>
      <FormKit
        v-model="internalData.formattedDate"
        type="date"
        :value="requiredDate('today')"
        :label="$t('form.date')"
        validation-visibility="live"
        placeholder="DD/MM/YYYY"
        :min="todaysDate"
        outer-class="$reset"
        required
        wrapper-class="$reset"
        label-class="block font-semibold text-black opacity-[0.87] text-sm"
        inner-class="$reset border-[#000000] border-opacity-[0.87] border-[1px] rounded-md"
        input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400"
        messages-class="absolute bottom-[5px] text-red-500 text-[10px]"
      />
    </div>
    <div>
      <FormKit
        v-model="internalData.formatTime"
        type="time"
        value="12:00"
        min="00:00"
        :label="$t('form.time')"
        wrapper-class="$reset"
        outer-class="$reset"
        label-class="block font-semibold text-black opacity-[0.87] text-sm"
        inner-class="$reset border-[#000000] border-opacity-[0.87] border-[1px] rounded-md"
        input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 border-[#000000]"
      />
    </div>
    <div class="flex items-end gap-x-4 max-w-[640px] sm:max-w-full">
      <div>
        <FormKit
          v-model="internalData.passengers"
          type="number"
          value="1"
          min="1"
          placeholder="1"
          :label="$t('form.passengers')"
          wrapper-class="$reset"
          outer-class="$reset"
          label-class="block font-semibold text-black opacity-[0.87] text-sm"
          inner-class="$reset border-[#000000] border-opacity-[0.87] border-[1px] rounded-md"
          input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 border-[#000000]"
        />
      </div>
      <div class="flex gap-x-4">
        <div class="flex justify-center items-end gap-x-3">
          <div>
            <FormKit
              v-model="internalData.luggage"
              type="number"
              value="1"
              min="1"
              placeholder="1"
              :label="$t('form.luggage')"
              wrapper-class="$reset"
              outer-class="$reset"
              label-class="block font-semibold text-black opacity-[0.87] text-sm"
              inner-class="$reset border-[#000000] border-opacity-[0.87] border-[1px] rounded-md"
              input-class="w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 border-[#000000]"
            />
          </div>
        </div>
      </div>
      <div class="hidden sm:block lg:hidden w-full sm:w-auto">
        <Button
          :label="$t('form.search-button')"
          :loading="loading"
          icon="pi pi-check"
          class="w-full sm:w-[240px] md:w-[200px] h-12 text-[16px] bg-custom-blue hover:bg-opacity-85 p-2 text-white mt-8 lg:mt-0"
          @click="handleChapterChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type FormDataVariables } from '../data/formData'
type ModelValue = Pick<
  FormDataVariables,
  'formattedDate' | 'formatTime' | 'passengers' | 'luggage'
>;

const props = defineProps<{
  modelValue: ModelValue;
  loading: boolean;
}>()

const internalData = ref(props.modelValue)

const emit = defineEmits(['update:modelValue', 'emittedChapter'])

const handleChapterChange = () => {
  emit('emittedChapter')
}

watch(internalData, (value: ModelValue) => {
  emit('update:modelValue', value)
})

watch(
  () => props.modelValue,
  (value: ModelValue) => {
    internalData.value = value
  }
)

const todaysDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate())
  return date.toISOString().split('T')[0]
})

const requiredDate = (date: string) => {
  if (date === 'minDate') {
    return `required|date_after:${new Date().toISOString().split('T')[0]}`
  } else if (date === 'today') {
    return new Date().toISOString().split('T')[0]
  } else {
    return ''
  }
}
</script>
