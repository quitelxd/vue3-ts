export function getEnvValue(key) {
  return import.meta.env[key]
}

export function getBaseUrl() {
  return getEnvValue('VITE_BASE_URL')
}

export function getApiBaseUrl() {
  return getEnvValue('VITE_APP_API_BASE_URL')
}

export function getAppTitle() {
  return getEnvValue('VITE_APP_TITLE')
}

export function isDev() {
  return import.meta.env.DEV
}

export function isProd() {
  return import.meta.env.PROD
} 