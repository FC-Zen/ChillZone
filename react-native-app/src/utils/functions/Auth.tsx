import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Récupère le token access à partir de l'instance de SessionContext.
 *
 * @returns {string|null} Le token CSRF ou null si non disponible.
 */
export const getAccessToken = async (): Promise<string | null> => {
    try {
        const access = await AsyncStorage.getItem('access');
        if (!access) {
            console.warn('Aucun token access trouvé dans AsyncStorage');
            return null;
        }
        return access;
    } catch (error) {
        console.error('Erreur lors de la récupération du token access depuis AsyncStorage:', error);
        return null;
    }
};
