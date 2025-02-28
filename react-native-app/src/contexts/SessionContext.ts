export class SessionContext {
    private static instance: SessionContext; 
    private sessionId: string | null = null;
    private csrfToken: string | null = null;
    
    private constructor() {}
    
    public static getInstance(): SessionContext {
        if (!SessionContext.instance) {
          SessionContext.instance = new SessionContext();
        }
        return SessionContext.instance;
      }
    
    public setSession(sessionId: string, csrfToken: string): void {
      this.sessionId = sessionId;
      this.csrfToken = csrfToken;
    }
    
    // 🔹 Getter pour récupérer le CSRF Token (obligatoirement string)
    public getCsrfToken(): string {
      if (!this.csrfToken) {
          throw new Error("CSRF Token manquant. L'utilisateur doit être connecté.");
      }
      return this.csrfToken;
    }

    // 🔹 Getter pour récupérer le Session ID (pareil si tu veux sécuriser)
    public getSessionId(): string {
        if (!this.sessionId) {
            throw new Error("Session ID manquant. L'utilisateur doit être connecté.");
        }
        return this.sessionId;
    }
    
    // 🔹 Supprime les valeurs stockées (Déconnexion)
    public clearSession(): void {
      this.sessionId = null;
      this.csrfToken = null;
    }
  }
    