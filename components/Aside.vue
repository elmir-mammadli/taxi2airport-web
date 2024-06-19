<template>
  <section class="bg-gray-200 px-5">
    <div>
      <aside
        class="max-w-[1280px] mx-auto w-full h-[40px] flex items-center text-[10px]"
      >
        <div class="hidden md:flex items-center gap-x-5 me-auto">
          <div v-for="(item, index) in asideData.slice(0, 3)" :key="index">
            <div class="flex gap-x-2 items-center">
              <Icon :name="item.icon" size="15" />
              <p class="text-xs" v-html="item.text" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-x-2">
          <div v-for="(item, index) in slicedAsideData" :key="index">
            <div class="flex items-center gap-x-1">
              <NuxtLink class="hover:underline" :to="item.link">
                <Icon :name="item.icon" size="18" />
              </NuxtLink>
              <p
                class="text-xs"
                :class="{
                  'border-r pr-2 border-gray-500': index === 0
                }"
                v-html="item.text"
              />
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
    icon: 'twemoji:check-mark-button',
    text: $t('aside.item-1')
  },
  {
    icon: 'twemoji:technologist-medium-skin-tone',
    text: $t('aside.item-2')
  },
  {
    icon: 'twemoji:oncoming-taxi',
    text: $t('aside.item-3')
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

const slicedAsideData = [...asideData.value.slice(3)]
</script>
