// Exemples d'authentification
const validEmail = 'user@example.com';
const validPassword = 'password123'; // Exemple de mot de passe

// Fonction de connexion
export const authenticateUser = async (formData : any) => {
  // Vérification des informations d'authentification
  if (formData.login !== validEmail || formData.password !== validPassword) {
    throw new Error('Email ou mot de passe incorrect'); // Erreur si les informations ne correspondent pas
  }
  // Logique de connexion réussie
  console.log('Authentification réussie pour:', formData.login);

  // Simule une réponse ici
  return { success: true, message: 'Connexion réussie !' };
};
