// Server par code deploy karne ke baad APK yahan se load karegi.
// Example: set CAPACITOR_SERVER_URL=https://yourdomain.com before building APK
const serverUrl = process.env.CAPACITOR_SERVER_URL

const config = {
  appId: 'com.neo.app',
  appName: 'Neo',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    ...(serverUrl ? { url: serverUrl, cleartext: serverUrl.startsWith('http://') } : {}),
  },
  android: {
    backgroundColor: '#212121',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#212121',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#171717',
    },
  },
}

export default config
