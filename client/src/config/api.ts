export type FormsApiEndpoint = 'contact' | 'inquiry'

function readEnvironmentValue(value: string | undefined) {
  return value?.trim() ?? ''
}

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '')
}

function normalizeEndpoint(value: string, fallback: string) {
  const endpoint = value || fallback
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`
}

const formsApiBaseUrl = normalizeBaseUrl(readEnvironmentValue(import.meta.env.VITE_FORMS_API_BASE_URL))

export const formsApiConfig = Object.freeze({
  baseUrl: formsApiBaseUrl,
  endpoints: Object.freeze({
    contact: normalizeEndpoint(readEnvironmentValue(import.meta.env.VITE_CONTACT_FORM_ENDPOINT), '/api/contact'),
    inquiry: normalizeEndpoint(readEnvironmentValue(import.meta.env.VITE_INQUIRY_FORM_ENDPOINT), '/api/contact'),
  }),
  turnstileSiteKey: readEnvironmentValue(import.meta.env.VITE_TURNSTILE_SITE_KEY),
})

export function getFormsApiUrl(endpoint: FormsApiEndpoint) {
  return `${formsApiConfig.baseUrl}${formsApiConfig.endpoints[endpoint]}`
}
