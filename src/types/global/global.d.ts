/// <reference types="vite/client" />

// Vue 文件类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 可以在这里添加其他全局类型声明
declare interface Window {
  // 全局 window 对象的扩展
}

declare interface ImportMetaEnv {
  // 环境变量的类型声明
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
} 