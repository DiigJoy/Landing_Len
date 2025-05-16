// env.d.ts
interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  // GitHub API
  readonly VITE_GITHUB_TOKEN: string;
  readonly VITE_GITHUB_OWNER: string;
  readonly VITE_GITHUB_REPO: string;
  // Google Analytics
  readonly VITE_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}