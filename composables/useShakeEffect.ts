export default function useShakeEffect () {
  const isShaking = ref(false)

  const shakeHandler = () => {
    isShaking.value = true
    setTimeout(() => {
      isShaking.value = false
    }, 1000)
  }

  return {
    isShaking,
    shakeHandler
  }
}
