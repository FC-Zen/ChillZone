// Exemples d'authentification
const validEmail = 'user@example.com';
const validPassword = 'password123'; // Exemple de mot de passe

// Fonction de connexion
export const authenticateUser = async (email: string, password: string) => {
  // Vérification des informations d'authentification
  if (email !== validEmail || password !== validPassword) {
    throw new Error('Email ou mot de passe incorrect'); // Erreur si les informations ne correspondent pas
  }

  // Logique de connexion réussie
  console.log('Authentification réussie pour:', email);

  // Simule une réponse ici
  return { success: true, message: 'Connexion réussie !' };
};
