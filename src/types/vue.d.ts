declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  export * from '@vue/runtime-dom'
  export * from '@vue/runtime-core'
  interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement | any
    }
  }
} 