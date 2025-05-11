/// <reference types="vite/client" />
/// <reference types="element-plus/global" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_USE_MOCK: string // 'true' or 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 