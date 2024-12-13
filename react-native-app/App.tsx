import { RootNavigator } from '@navigation/RootNavigator';
import '@translations/i18n';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning']); // Ignore les logs de type 'Warning'
  return <RootNavigator />;
}
