import { RootNavigator } from '@navigation/RootNavigator';
import { logoutUser } from '@services';
import '@translations/i18n';
import { useEffect } from 'react';
import { AppState, AppStateStatus, LogBox, Platform } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';

export default function App() {
  LogBox.ignoreLogs(['Warning']);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        console.log("🔴 Application en arrière-plan ou fermée. Déconnexion...");
        await logoutUser();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    if (Platform.OS === 'android') {
      initBackgroundFetch();
    }

    return () => {
      subscription.remove();
    };
  }, []);

  return <RootNavigator />;
}

// ⚙️ Configuration de la tâche background (Android)
async function initBackgroundFetch() {
  const status = await BackgroundFetch.configure({
    minimumFetchInterval: 15,
    stopOnTerminate: false,
    enableHeadless: true,
  }, async () => {
    console.log('🔴 BackgroundFetch déclenché, déconnexion...');
    await logoutUser();
    BackgroundFetch.finish();  // ✅ nouvelle méthode sûre.
  }, (error) => {
    console.warn('⚠️ BackgroundFetch failed to start', error);
  });

  if (status !== BackgroundFetch.STATUS_AVAILABLE) {
    console.warn('⚠️ BackgroundFetch non disponible');
  }
}

// Android : gestion en cas de kill via Headless JS
BackgroundFetch.registerHeadlessTask(async () => {
  console.log('🔴 BackgroundFetch Headless Task déclenchée (app tuée). Déconnexion...');
  await logoutUser();
});
