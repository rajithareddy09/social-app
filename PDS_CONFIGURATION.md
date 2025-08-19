# Custom PDS Configuration

This repository has been configured to use a custom Personal Data Server (PDS) at `app.sfproject.net`.

## What is a PDS?

A Personal Data Server (PDS) is a core component of the AT Protocol (used by Bluesky) that stores user data, handles authentication, and manages the social graph. By default, the Bluesky app connects to `bsky.social`, but you can configure it to use your own PDS instance.

## Configuration Files

### 1. PDS Configuration (`src/lib/pds-config.ts`)

This file contains the main configuration for your custom PDS:

```typescript
export const PDS_CONFIG = {
  // Your custom PDS domain
  CUSTOM_PDS_URL: 'https://app.sfproject.net',
  CUSTOM_PDS_DID: 'did:web:app.sfproject.net',
  
  // Default Bluesky services (fallback)
  DEFAULT_PDS_URL: 'https://bsky.social',
  DEFAULT_PDS_DID: 'did:web:bsky.social',
  
  // Staging service
  STAGING_PDS_URL: 'https://staging.bsky.dev',
  
  // Local development
  LOCAL_DEV_URL: Platform.OS === 'android' ? 'http://10.0.2.2:2583' : 'http://localhost:2583',
}
```

### 2. Constants (`src/lib/constants.ts`)

The constants file has been updated to use the custom PDS configuration:

```typescript
// Custom PDS Configuration - dynamically configured
export const CUSTOM_PDS_SERVICE = getActivePDSUrl()
export const CUSTOM_PDS_SERVICE_DID = getActivePDSDID()

// Use custom PDS if enabled, otherwise fall back to default
export const DEFAULT_SERVICE = CUSTOM_PDS_SERVICE
```

### 3. App Configuration (`app.config.js`)

The app configuration includes your custom domain in the associated domains for iOS:

```javascript
const ASSOCIATED_DOMAINS = [
  'applinks:bsky.app',
  'applinks:staging.bsky.app',
  'appclips:bsky.app',
  'appclips:go.bsky.app',
  // Custom PDS domain
  'applinks:app.sfproject.net',
  // ... other domains
]
```

## How It Works

1. **Default Behavior**: The app will now connect to `https://app.sfproject.net` by default instead of `https://bsky.social`

2. **Dynamic Configuration**: The PDS URL is determined by the `getActivePDSUrl()` function in `pds-config.ts`

3. **Fallback Support**: You can modify the configuration to fall back to the default Bluesky service if needed

## Customization Options

### Switching Between PDS Instances

You can modify the `getActivePDSUrl()` function in `pds-config.ts` to implement logic for switching between different PDS instances:

```typescript
export function getActivePDSUrl(): string {
  // Example: Use environment variable to switch PDS
  if (process.env.EXPO_PUBLIC_USE_CUSTOM_PDS === 'true') {
    return PDS_CONFIG.CUSTOM_PDS_URL
  }
  
  // Example: Use different PDS for different environments
  if (process.env.EXPO_PUBLIC_ENV === 'staging') {
    return PDS_CONFIG.STAGING_PDS_URL
  }
  
  // Default to custom PDS
  return PDS_CONFIG.CUSTOM_PDS_URL
}
```

### Environment-Based Configuration

You can create a `.env` file (not tracked by git) to control PDS selection:

```bash
# .env
EXPO_PUBLIC_USE_CUSTOM_PDS=true
EXPO_PUBLIC_CUSTOM_PDS_URL=https://app.sfproject.net
```

## Requirements for Your PDS

Your PDS at `app.sfproject.net` must:

1. **Implement the AT Protocol**: Support all required endpoints for authentication, posts, feeds, etc.
2. **Use HTTPS**: The app requires secure connections
3. **Have Valid SSL Certificate**: iOS and Android require valid SSL certificates
4. **Support CORS**: Allow cross-origin requests from the mobile app
5. **Handle Authentication**: Support JWT-based authentication flow

## Testing

To test your custom PDS configuration:

1. **Build and Run**: Use `yarn ios` or `yarn android` to test on device/simulator
2. **Check Network**: Monitor network requests to ensure they're going to `app.sfproject.net`
3. **Authentication**: Test login/signup flows with your PDS
4. **Content**: Verify posts, feeds, and other features work correctly

## Troubleshooting

### Common Issues

1. **SSL Certificate Errors**: Ensure your domain has a valid SSL certificate
2. **CORS Issues**: Configure your PDS to allow requests from the mobile app
3. **Authentication Failures**: Verify your PDS implements the correct authentication flow
4. **Network Timeouts**: Check if your PDS is accessible and responsive

### Debug Mode

You can add logging to see which PDS is being used:

```typescript
export function getActivePDSUrl(): string {
  const url = PDS_CONFIG.CUSTOM_PDS_URL
  console.log('Using PDS:', url)
  return url
}
```

## Security Considerations

- **HTTPS Required**: Never use HTTP for production PDS instances
- **Valid SSL**: Use a trusted SSL certificate provider
- **Domain Validation**: Ensure your domain is properly configured and validated
- **Rate Limiting**: Implement appropriate rate limiting on your PDS
- **Authentication**: Use secure JWT tokens and proper session management

## Support

If you encounter issues with your custom PDS configuration:

1. Check the AT Protocol documentation
2. Verify your PDS implementation follows the protocol specification
3. Test with the official AT Protocol tools
4. Check network logs and error messages in the app

## Additional Resources

- [AT Protocol Documentation](https://atproto.com/)
- [Bluesky PDS Implementation](https://github.com/bluesky-social/atproto)
- [AT Protocol GitHub Repository](https://github.com/bluesky-social/atproto)

