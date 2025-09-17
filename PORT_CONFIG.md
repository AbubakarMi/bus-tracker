# Port Configuration

This application is configured to run on **port 3002** consistently across all environments.

## Configuration Files Updated

### 1. package.json
- `dev` script: `"next dev --port 3002"` (Turbopack disabled due to compatibility issues)
- `start` script: `"next start --port 3002"`

### 2. .env.local
```bash
PORT=3002
NEXT_PUBLIC_PORT=3002
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXTAUTH_URL=http://localhost:3002
NODE_ENV=development
```

### 3. next.config.ts
```typescript
env: {
  CUSTOM_PORT: '3002',
  NEXT_PUBLIC_PORT: '3002',
}
```

## URLs

- **Development**: http://localhost:3002
- **Network**: http://192.168.1.178:3002

## Usage

```bash
# Development server
npm run dev

# Production server
npm run build
npm run start
```

Both commands will now consistently use port 3002.

## Notes

- Port 3002 was chosen to avoid conflicts with other common development ports
- Environment variables ensure consistency across different deployment environments
- All URLs and references in the application should use the configured port
- **Turbopack Disabled**: Due to runtime errors with Turbopack, the development server uses the standard Next.js bundler for stability

## Troubleshooting

If you encounter port conflicts:
```bash
# Check what's using the port
netstat -ano | findstr :3002

# Kill the process (replace PID with actual process ID)
powershell "Stop-Process -Id <PID> -Force"

# Clear Next.js cache if needed
powershell "Remove-Item -Recurse -Force .next"
```