// v-reveal: fades an element in the first time it scrolls into view.
// v-reveal="120" delays it by 120ms, for simple staggering.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    getSSRProps: binding => ({
      'data-reveal': '',
      'style': binding.value ? `--d:${binding.value}ms` : undefined
    }),
    mounted(el, binding) {
      el.setAttribute('data-reveal', '')
      if (binding.value) el.style.setProperty('--d', `${binding.value}ms`)
      if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-in')
        return
      }
      const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
          el.classList.add('is-in')
          io.disconnect()
        }
      }, { rootMargin: '0px 0px -8% 0px' })
      io.observe(el)
    }
  })
})
