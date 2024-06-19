import { useBreakpoints } from '@vueuse/core'
const router = useRouter()

export const useScroll = () => {
  const breakpoints = useBreakpoints({
    md: 768,
    xl: 1280
  })

  const isMobile = breakpoints.smaller('md')
  const isTablet = breakpoints.between('md', 'xl')

  const scroll = (section: string) => {
    const targetEl = document.getElementById(section)
    const yOffset = isMobile.value ? -64 : isTablet.value ? -152 : -76

    if (targetEl) {
      const yAxis = targetEl.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: yAxis, behavior: 'smooth' })
      router.push({
        query: { section }
      })
    }
  }

  return { scroll }
}
