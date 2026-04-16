/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // Google Analytics
    readonly NEXT_PUBLIC_GA_ID: string
    // Google AdSense
    readonly NEXT_PUBLIC_ADSENSE_CLIENT_ID: string
    // Database
    readonly DATABASE_URL?: string
    // Admin
    readonly ADMIN_PASSWORD?: string
    // API
    readonly API_SECRET_KEY?: string
    // Environment
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_APP_URL: string
  }
}

