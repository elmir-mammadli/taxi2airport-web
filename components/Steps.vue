<template>
  <div>
    <div class="card">
      <Steps
        :model="items"
        aria-label="Form Steps"
        :readonly="false"
        :pt="{
          menuitem: (context: any) => ({
            class: isActive(context.item) && 'p-highlight p-steps-current'
          })
        }"
      >
        <template #item="{ label, item, index, props }">
          <router-link
            v-if="item.route"
            v-slot="routerProps"
            :to="item.route"
            custom
          >
            <a
              :href="routerProps.href"
              v-bind="props.action"
              @click="($event) => routerProps.navigate($event)"
              @keydown.enter="($event) => routerProps.navigate($event)"
            >
              <span v-bind="props.step">{{ index + 1 }}</span>
              <span v-bind="props.label">{{ label }}</span>
            </a>
          </router-link>
          <span v-else v-bind="props.action">
            <span v-bind="props.step">{{ index + 1 }}</span>
            <span v-bind="props.label">{{ label }}</span>
          </span>
        </template>
      </Steps>
    </div>
  </div>
</template>

<script setup lang="ts">

const router = useRouter()
const route = useRoute()

interface Steps {
  label: string
  route: string
}
const items = ref<Steps[]>([
  {
    label: 'Personal',
    route: '/'
  },
  {
    label: 'Seat',
    route: '/seat'
  },
  {
    label: 'Payment',
    route: '/payment'
  },
  {
    label: 'Confirmation',
    route: '/confirmation'
  }
])

const isActive = (item: Steps) => {
  return item.route ? router.resolve(item.route).path === route.path : false
}
</script>
