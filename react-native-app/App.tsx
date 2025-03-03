import { RootNavigator } from '@navigation/RootNavigator';
import { logoutUser } from '@services';
import '@translations/i18n';
import { useEffect } from 'react';
import { AppState, AppStateStatus, LogBox, Platform } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning']);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        console.log("🔴 Application en arrière-plan ou fermée. Déconnexion...");
        await logoutUser(false);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return <RootNavigator />;
}