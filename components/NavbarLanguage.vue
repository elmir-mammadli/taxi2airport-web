<template>
  <div>
    <div
      class="relative flex items-center gap-x-2 cursor-pointer border-[1px] border-custom-blue z-30 py-2 px-3 rounded-[6px] font-semibold"
      @click="toggleDropdown"
    >
      <Icon :name="`circle-flags:${selectedFlag}`" /> {{ selectedLanguage }}
    </div>
    <ul
      v-show="showDropdown"
      class="absolute mt-2 p-2 shadow menu bg-white rounded-box font-semibold"
    >
      <li
        v-for="(item, index) in languages"
        :key="index"
        class="p-1 cursor-pointer"
      >
        <div
          v-if="item.name.toLowerCase() !== locale"
          @click="langSwitch(item.name.toLowerCase())"
        >
          <span class="flex items-center gap-x-1">
            <Icon :name="`circle-flags:${item.name.toLowerCase()}`" />
            <p>{{ item.name }}</p>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useLanguage();
const showDropdown = ref(false);

type Languages = {
  name: string;
};

const langSwitch = (lang: string) => {
  locale.value = lang;
  showDropdown.value = false;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectedLanguage = computed(() => {
  const lang = languages.find(
    (lang) => lang.name.toLowerCase() === locale.value
  );
  return lang?.name;
});
const selectedFlag = computed(() => {
  const lang = languages.find(
    (lang) => lang.name.toLowerCase() === locale.value
  );
  return lang?.name.toLowerCase();
});

locale.value = 'en';
const languages: Languages[] = [
  {
    name: 'EN'
  },
  {
    name: 'CS'
  },
  {
    name: 'DE'
  },
  {
    name: 'ES'
  },
  {
    name: 'UA'
  },
  {
    name: 'TR'
  },
  {
    name: 'RU'
  }
];

watch(locale, () => {
  showDropdown.value = false;
});
</script>
