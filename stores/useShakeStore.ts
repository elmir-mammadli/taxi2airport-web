import { defineStore } from 'pinia'

export const useShakeStore = defineStore('shake', {
  state: () => ({
    shouldShakeForm: false
  }),
  actions: {
    triggerShake() {
      this.shouldShakeForm = true;
      setTimeout(() => {
        this.shouldShakeForm = false;
      }, 1000);
    }
  }
});
