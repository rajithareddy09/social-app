# PDS Configuration Summary

## Overview
The social-app has been configured to use the SF Project PDS services instead of the default Bluesky services.

## Configuration Files

### 1. Main PDS Configuration (`src/lib/pds-config.ts`)
- Contains the main PDS configuration logic
- Imports from the environment configuration
- Provides functions to get active PDS URLs and DIDs

### 2. Environment Configuration (`src/env/pds-config.ts`)
- Contains environment-specific PDS settings
- Has a simple flag `USE_SF_PROJECT_PDS` to control which PDS to use
- **To change PDS settings, modify this file**

### 3. Constants (`src/lib/constants.ts`)
- Uses the PDS configuration functions
- All service URLs now point to the configured PDS

## Current Configuration

The app is currently configured to use:
- **PDS**: `https://pdsapi.sfproject.net`
- **AppView**: `https://bsky.sfproject.net`
- **Ozone**: `https://ozone.sfproject.net`
- **PLC**: `https://plc.sfproject.net`

## How to Modify

### Option 1: Change the Configuration Flag
In `src/env/pds-config.ts`, modify the `USE_SF_PROJECT_PDS` constant:

```typescript
// Set to false to use staging or development
const USE_SF_PROJECT_PDS = false
```

### Option 2: Modify Environment Settings
In `src/env/pds-config.ts`, modify the `PDS_ENV_CONFIG` object:

```typescript
[ENV.PRODUCTION]: {
  pdsUrl: 'https://your-custom-pds.com',
  appViewUrl: 'https://your-custom-appview.com',
  // ... other settings
}
```

### Option 3: Use Different Environment
Change the `getCurrentEnvironment()` function to return a different environment:

```typescript
export function getCurrentEnvironment(): Environment {
  return ENV.STAGING // or ENV.DEVELOPMENT
}
```

## Service URLs Used

The app now uses these configured URLs for:
- **Public Agent** (before login): `getActiveAppViewUrl()`
- **Logged-in Users**: `getActivePDSUrl()`
- **Local Development**: `getActivePDSUrl()`

## Testing

To test if the configuration is working:
1. Build and run the app
2. Check network requests in the browser/device
3. Verify that requests go to your configured PDS URLs
4. Test login/signup flows

## Troubleshooting

If you still see localhost URLs:
1. Check that `USE_SF_PROJECT_PDS = true` in `src/env/pds-config.ts`
2. Verify that the environment is set to `ENV.PRODUCTION`
3. Check that all imports are working correctly
4. Rebuild the app after making changes

## Notes

- The configuration is now centralized in the environment config file
- All service URLs are dynamically determined based on the configuration
- The app will automatically use the configured PDS for all operations
- You can easily switch between different PDS instances by modifying the configuration
