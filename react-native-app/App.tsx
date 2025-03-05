import { RootNavigator } from '@navigation/RootNavigator';
import { logoutUser } from '@services';
import '@translations/i18n';
import { useEffect } from 'react';
import { AppState, AppStateStatus, LogBox, Platform } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning']);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
  
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        timeout = setTimeout(async () => {
          console.log('🔴 Application en arrière-plan. Déconnexion...');
          await logoutUser(false);
        }, 5000);
      } else if (nextAppState === 'inactive') {
        timeout = setTimeout(async () => {
          console.log('⚪ Application inactive. Déconnexion après un délai...');
          await logoutUser(false);
        }, 5000);
      } else {
        clearTimeout(timeout);
      }
    };
  
    const subscription = AppState.addEventListener('change', handleAppStateChange);
  
    return () => {
      clearTimeout(timeout);
      subscription.remove();
    };
  }, []);
  

  return <RootNavigator />;
}