<template>
  <FormKit
    v-for="(dateTime, index) in dateTimeArr"
    :key="index"
    :v-model="dateTime.model"
    :type="dateTime.type"
    :value="dateTime.value"
    :label="dateTime.label"
    :validation-visibility="dateTime.validationVisibility"
    :placeholder="dateTime.placeholder"
    :min="(dateTime.min as string | number)"
    :max="dateTime.max"
    outer-class="$reset"
    wrapper-class="$reset"
    :label-class="dateTime.labelClass"
    :inner-class="dateTime.innerClass"
    :input-class="dateTime.inputClass"
    :messages-class="dateTime.messagesClass"
  />
</template>

<script setup lang="ts">
import { type FormDataVariables } from '../data/formData'
const { $t } = useLanguage()

const props = defineProps<{
  formattedDate: FormDataVariables['formattedDate'];
  formatTime: FormDataVariables['formatTime'];
}>()

const handleInputClasses = (
  forLabel?: string,
  forInner?: string
) => {
  const labelClassAttrs = 'block font-semibold text-black opacity-[0.87] text-sm'
  const innerClassAttrs = '$reset border-[#000000] border-opacity-[0.87] border-[1px] rounded-md'

  if (forLabel) {
    return labelClassAttrs
  }
  if (forInner) {
    return innerClassAttrs
  }
}

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

interface DateTimeProperties {
  model: string;
  type: 'date' | 'time'
  value?: string;
  label: string;
  validationVisibility?: 'live' | undefined;
  placeholder?: string;
  min: string | number | ComputedRef<string> | undefined
  max?: string;
  labelClass?: string
  innerClass?: string
  inputClass: string;
  messagesClass: string;

}
const dateTimeArr: DateTimeProperties[] = [
  {
    model: props.formattedDate,
    type: 'date',
    value: requiredDate('today'),
    label: $t('form.date'),
    validationVisibility: 'live',
    placeholder: 'DD/MM/YYYY',
    min: todaysDate,
    max: undefined,
    labelClass: handleInputClasses('labelClass', undefined),
    innerClass: handleInputClasses(undefined, 'innerClass'),
    inputClass: 'w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 focus:ring-1 focus:rounded-md',
    messagesClass: 'absolute bottom-[5px] text-red-500 text-[10px]'
  },
  {
    model: props.formatTime,
    type: 'time',
    value: undefined,
    label: $t('form.time'),
    validationVisibility: undefined,
    placeholder: undefined,
    min: '00:00',
    max: '23:00',
    labelClass: handleInputClasses('labelClass', undefined),
    innerClass: handleInputClasses(undefined, 'innerClass'),
    inputClass: 'w-full h-10 px-3 border-none text-[14px] text-gray-700 placeholder-gray-400 border-[#000000]',
    messagesClass: ''
  }
]
</script>
