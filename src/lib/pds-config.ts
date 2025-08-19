/**
 * PDS Configuration for custom Personal Data Server
 * This file manages the configuration for connecting to a custom PDS instance
 */

import {Platform} from 'react-native'
import {CURRENT_PDS_CONFIG, ENV, getCurrentEnvironment} from '../env/pds-config'

// PDS Service Configuration
export const PDS_CONFIG = {
  // SF Project PDS services
  SF_PDS_URL: 'https://pdsapi.sfproject.net',
  SF_PDS_DID: 'did:web:pdsapi.sfproject.net',
  
  // SF Project AppView service
  SF_APPVIEW_URL: 'https://bsky.sfproject.net',
  SF_APPVIEW_DID: 'did:web:bsky.sfproject.net',
  
  // SF Project Ozone service
  SF_OZONE_URL: 'https://ozone.sfproject.net',
  
  // SF Project PLC service
  SF_PLC_URL: 'https://plc.sfproject.net',
  
  // Default Bluesky services (fallback)
  DEFAULT_PDS_URL: 'https://bsky.social',
  DEFAULT_PDS_DID: 'did:web:bsky.social',
  
  // Staging service
  STAGING_PDS_URL: 'https://staging.bsky.dev',
  
  // Local development
  LOCAL_DEV_URL: Platform.OS === 'android' ? 'http://10.0.2.2:2583' : 'http://localhost:2583',
}

// Function to get the active PDS URL
export function getActivePDSUrl(): string {
  const env = getCurrentEnvironment()
  
  if (env === ENV.PRODUCTION) {
    return CURRENT_PDS_CONFIG.pdsUrl
  }
  
  if (env === ENV.STAGING) {
    return PDS_CONFIG.STAGING_PDS_URL
  }
  
  if (env === ENV.DEVELOPMENT) {
    return CURRENT_PDS_CONFIG.pdsUrl
  }
  
  // Default to SF Project PDS
  return CURRENT_PDS_CONFIG.pdsUrl
}

// Function to get the active AppView URL
export function getActiveAppViewUrl(): string {
  const env = getCurrentEnvironment()
  
  if (env === ENV.PRODUCTION) {
    return CURRENT_PDS_CONFIG.appViewUrl
  }
  
  if (env === ENV.STAGING) {
    return PDS_CONFIG.STAGING_PDS_URL
  }
  
  if (env === ENV.DEVELOPMENT) {
    return CURRENT_PDS_CONFIG.appViewUrl
  }
  
  return CURRENT_PDS_CONFIG.appViewUrl
}
export function getSocialAppUrl(): string {

  return "https://app.sfproject.net"
}

// Function to check if using SF Project PDS
export function isUsingSFProjectPDS(): boolean {
  return getCurrentEnvironment() === ENV.PRODUCTION
}

// Function to check if using custom PDS
export function isUsingCustomPDS(): boolean {
  return getActivePDSUrl() !== PDS_CONFIG.DEFAULT_PDS_URL
}

// Function to get PDS DID
export function getActivePDSDID(): string {
  const env = getCurrentEnvironment()
  
  if (env === ENV.PRODUCTION) {
    return CURRENT_PDS_CONFIG.pdsDid
  }
  
  if (env === ENV.STAGING) {
    return PDS_CONFIG.DEFAULT_PDS_DID
  }
  
  if (env === ENV.DEVELOPMENT) {
    return CURRENT_PDS_CONFIG.pdsDid
  }
  
  return CURRENT_PDS_CONFIG.pdsDid
}

// Function to get AppView DID
export function getActiveAppViewDID(): string {
  const env = getCurrentEnvironment()
  
  if (env === ENV.PRODUCTION) {
    return CURRENT_PDS_CONFIG.appViewDid
  }
  
  if (env === ENV.STAGING) {
    return PDS_CONFIG.DEFAULT_PDS_DID
  }
  
  if (env === ENV.DEVELOPMENT) {
    return CURRENT_PDS_CONFIG.appViewDid
  }
  
  return CURRENT_PDS_CONFIG.appViewDid
}

// Export individual constants for backward compatibility
export const CUSTOM_PDS_SERVICE = CURRENT_PDS_CONFIG.pdsUrl
export const CUSTOM_PDS_SERVICE_DID = CURRENT_PDS_CONFIG.pdsDid
export const SF_PROJECT_PDS_SERVICE = PDS_CONFIG.SF_PDS_URL
export const SF_PROJECT_APPVIEW_SERVICE = PDS_CONFIG.SF_APPVIEW_URL

