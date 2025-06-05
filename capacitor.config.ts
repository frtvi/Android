
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c85f5e2df2454444a3f0ee90ae31eb22',
  appName: 'browse-supa-mobile',
  webDir: 'dist',
  server: {
    url: 'https://c85f5e2d-f245-4444-a3f0-ee90ae31eb22.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e40af',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;
