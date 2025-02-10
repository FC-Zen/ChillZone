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
    
    // 🔹 Getter pour récupérer le CSRF Token
    public getCsrfToken(): string | null {
      return this.csrfToken;
    }
  
    // 🔹 Getter pour récupérer le Session ID (au cas où)
    public getSessionId(): string | null {
      return this.sessionId;
    }
  
    // 🔹 Supprime les valeurs stockées (Déconnexion)
    public clearSession(): void {
      this.sessionId = null;
      this.csrfToken = null;
    }
  }
    