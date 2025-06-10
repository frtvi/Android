
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.redtasker',
  appName: 'RedTasker',
  webDir: 'dist',
  server: {
    url: 'https://c85f5e2d-f245-4444-a3f0-ee90ae31eb22.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#9333ea',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;
