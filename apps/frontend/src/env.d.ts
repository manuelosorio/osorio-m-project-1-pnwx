/// <reference types="astro/client-image" />
interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
