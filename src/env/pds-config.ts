/**
 * PDS Environment Configuration
 * This file contains environment-specific configuration for the PDS services
 */

// Environment detection
export const ENV = {
  PRODUCTION: 'production',
  STAGING: 'staging',
  DEVELOPMENT: 'development',
} as const

export type Environment = typeof ENV[keyof typeof ENV]

// Configuration flag - set this to true to use SF Project PDS
const USE_SF_PROJECT_PDS = true

// Get current environment
export function getCurrentEnvironment(): Environment {
  // If USE_SF_PROJECT_PDS is true, use production (SF Project PDS)
  if (USE_SF_PROJECT_PDS) {
    return ENV.PRODUCTION
  }
  
  // You can modify this to detect environment from build process
  // For now, default to production (SF Project PDS)
  return ENV.PRODUCTION
}

// PDS Configuration based on environment
export const PDS_ENV_CONFIG = {
  [ENV.PRODUCTION]: {
    useSFProjectPDS: true,
    useLocalPDS: false,
    pdsUrl: 'https://pdsapi.sfproject.net',
    appViewUrl: 'https://bsky.sfproject.net',
    ozoneUrl: 'https://ozone.sfproject.net',
    plcUrl: 'https://plc.sfproject.net',
    pdsDid: 'did:web:pdsapi.sfproject.net',
    appViewDid: 'did:web:bsky.sfproject.net',
  },
  [ENV.STAGING]: {
    useSFProjectPDS: false,
    useLocalPDS: false,
    pdsUrl: 'https://staging.bsky.dev',
    appViewUrl: 'https://staging.bsky.dev',
    ozoneUrl: 'https://staging.bsky.dev',
    plcUrl: 'https://staging.bsky.dev',
    pdsDid: 'did:web:staging.bsky.dev',
    appViewDid: 'did:web:staging.bsky.dev',
  },
  [ENV.DEVELOPMENT]: {
    useSFProjectPDS: false,
    useLocalPDS: true,
    pdsUrl: 'http://localhost:2583',
    appViewUrl: 'http://localhost:2584',
    ozoneUrl: 'http://localhost:3000',
    plcUrl: 'http://localhost:2582',
    pdsDid: 'did:web:localhost',
    appViewDid: 'did:web:localhost',
  },
}

// Get current PDS configuration
export function getCurrentPDSConfig() {
  const env = getCurrentEnvironment()
  return PDS_ENV_CONFIG[env]
}

// Export current configuration
export const CURRENT_PDS_CONFIG = getCurrentPDSConfig()

// Export the configuration flag for easy modification
export {USE_SF_PROJECT_PDS}
