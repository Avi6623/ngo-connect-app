import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2bd33154d5494d4781cc1c55ebb1b0ae',
  appName: 'ngo-connect-app',
  webDir: 'dist',
  server: {
    url: 'https://2bd33154-d549-4d47-81cc-1c55ebb1b0ae.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;