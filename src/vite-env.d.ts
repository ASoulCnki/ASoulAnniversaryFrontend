/// <reference types="vite/client" />
/// <reference types="react-dom/next" />

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
  VITE_APP_TOKEN_KEY: string
  VITE_APP_REPORT_DATA_KEY: string
  VITE_APP_OAUTH_URL: string;
  VITE_AUTH_REPORT_DATA_URL: string;
}
