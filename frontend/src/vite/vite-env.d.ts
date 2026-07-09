declare module "*.svg" {
  const src: string;
  export default src;
}

declare module '*.jpg';
declare module '*.png';
declare module "*.css";

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}