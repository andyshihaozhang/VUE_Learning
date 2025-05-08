/// <reference types="vite/client" />

// Vue �ļ���������
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// �����������������ȫ����������
declare interface Window {
  // ȫ�� window �������չ
}

declare interface ImportMetaEnv {
  // ������������������
  readonly VITE_APP_TITLE: string
  // ���໷������...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
} 