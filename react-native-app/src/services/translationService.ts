import i18n from '@translations/i18n';

export const translationService = {
  /**
   * [Fonction de test] de la traduction
   * Si la langue actuelle est 'fr', elle sera changée en 'en'.
   * Si la langue actuelle est 'en', elle sera changée en 'fr'.
   */
  toggleLanguage: () => {
    const newLanguage = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLanguage);
  },

  /**
   * Change la langue de l'application en fonction de la langue spécifiée.
   * @param {string} language - Code de la langue à appliquer (fr,en,es).
   */
  setLanguage: (language: string) => {
    i18n.changeLanguage(language);
  },

  /**
   * Récupère la langue actuellement définie dans l'application.
   * @returns {string} - Le code de la langue actuellement utilisée (par exemple, 'fr' ou 'en').
   */
  getCurrentLanguage: () => {
    return i18n.language;
  },
};