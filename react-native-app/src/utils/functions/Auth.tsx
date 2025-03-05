import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Récupère le token access à partir de l'instance de SessionContext.
 *
 * @returns {string|null} Le token CSRF ou null si non disponible.
 */
export const getAccessToken = async (): Promise<string | null> => {
  const access = await AsyncStorage.getItem('access');

  if (access) {
    return access; // Si le token est présent, on retourne le string
  } else {
    return null; // Retourne une chaîne vide car le token est manquant
  }
};
