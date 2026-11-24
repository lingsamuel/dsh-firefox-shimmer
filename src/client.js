import css from './shimmer.css'

/** 在 Cordis 插件启停时同步装卸 DSH 文字扫光修复。 */
export function apply(ctx) {
  if (!CSS.supports('-moz-appearance', 'none')) return

  ctx.effect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.append(style)
    return () => style.remove()
  }, 'firefox-shimmer: TextShimmer')
}
