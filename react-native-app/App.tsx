import { RootNavigator } from '@navigation/RootNavigator';
import { logoutUser } from '@services';
import '@translations/i18n';
import { useEffect } from 'react';
import { AppState, LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning']); // Ignore les logs de type 'Warning'

  // Déconnexion de l'utilisateur lorsque l'application passe en arrière-plan ou est fermée
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("🔴 Application en arrière-plan ou fermée. Déconnexion...");
        logoutUser(); // Déconnecte l'utilisateur
      }
    };

    // Ajout de l'écouteur global
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove(); // Nettoyage lors du démontage
    };
  }, []);
  
  return <RootNavigator />;
}
