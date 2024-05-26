export default function useShakeEffect() {
  const isShaking = ref(false);

  const shakeHandler = () => {
    isShaking.value = true;
    console.log('Shake handler called !', isShaking.value);
    setTimeout(() => {
      isShaking.value = false;
      console.log('Shake handler call finished ?', isShaking.value);
    }, 1000);
  };

  return {
    isShaking,
    shakeHandler
  };
}
