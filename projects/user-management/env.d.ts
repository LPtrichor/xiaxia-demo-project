/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
  const locale: any
  export default locale
}

declare module '*.css' {
  const css: string
  export default css
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}
