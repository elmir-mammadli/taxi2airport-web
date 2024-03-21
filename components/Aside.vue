<template>
    <section class="bg-gray-200">
        <div>
        <aside
        class="max-w-[1280px] mx-auto w-full h-[30px] flex items-center">
            <div class="hidden md:flex items-center gap-x-5 me-auto">
                <div v-for="(item, index) in asideData.slice(0, 3)" :key="index">
                <div class="flex gap-x-2">
                <Icon :name="item.icon" />
                <p class="text-xs" v-html="item.text" />
                </div>
            </div>
            </div>
            <div class="flex items-center gap-x-2">
                <div v-for="(item, index) in slicedAsideData" :key="index">
                <div class="flex">
                <Icon :name="item.icon" />
                <p class="text-xs" v-html="item.text" :class="{
                    'border-r pr-2 border-gray-500' : index === 0
                }" />
                <!-- <span v-if="index === 0" class="h-[15px] bg-black w-[1px]"></span> -->
                </div>
            </div>
            </div>
        </aside>
    </div>
    </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n()

type AsideVariables = 'icon' | 'text'

type AsideData = {
	[Key in AsideVariables]: string
}

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
    icon: 'twemoji:envelope-with-arrow',
    text: 'support@taxi2airport.cz'
},
{
    icon: 'bxl:whatsapp',
    text: ''
},
{
    icon: 'bxl:telegram',
    text: ''
}
])

const slicedAsideData = [...asideData.value.slice(3)]
</script>