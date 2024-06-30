<template>
  <section class="bg-gray-200 px-5">
    <div>
      <aside
        class="max-w-[1280px] mx-auto w-full h-[40px] flex items-center justify-center text-[10px]"
      >
        <div class="hidden md:flex items-center gap-x-5 me-auto">
          <div v-for="(item, index) in asideData.slice(0, 2)" :key="index">
            <div class="flex gap-x-2 items-center">
              <Icon :name="item.icon" size="15" color="green" />
              <p class="text-xs" v-html="item.text" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-x-2">
          <div v-for="(item, index) in slicedAsideData" :key="index">
            <div class="flex items-center gap-x-1">
              <NuxtLink class="hover:underline flex gap-x-2 items-center" :to="item.link">
                <Icon :name="item.icon" size="18" />
                <p
                  class="text-xs"
                  :class="{
                    'border-r pr-2 border-gray-500': index === 0
                  }"
                  v-html="item.text"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

type AsideVariables = 'icon' | 'text'

type AsideData = {
  [Key in AsideVariables]: string;
} & {link?: string}

const asideData: ComputedRef<AsideData[]> = computed(() => [
  {
    icon: 'pepicons-pop:dollar-circle-off',
    text: $t('aside.item-1')
  },
  {
    icon: 'ph:money-wavy',
    text: $t('aside.item-2')
  },
  {
    icon: 'material-symbols:phone-enabled-sharp',
    link: 'tel:+420773150831',
    text: '+420 773 150 831'
  },
  {
    icon: 'material-symbols:support-agent',
    link: 'mailto:support@taxi2airport.cz',
    text: 'support@taxi2airport.cz'
  },
  {
    icon: 'bxl:whatsapp',
    link: 'https://wa.me/420773150831',
    text: ''
  },
  {
    icon: 'bxl:telegram',
    link: 'https://t.me/+420773150831',
    text: ''
  }
])

const slicedAsideData = [...asideData.value.slice(2, 4)]
</script>
