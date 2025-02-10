type User = {
  email: string;
  establishment: string;
  first_name: string;
  last_name: string;
  phone: string;
  photo_link: string;
  type: string;
};

export class UserContext {
  private static instance: UserContext;
  private user: User = {
    email: "",
    establishment: "",
    first_name: "",
    last_name: "",
    phone: "",
    photo_link: "",
    type: "",
  };

  private constructor() {}

  public static getInstance(): UserContext {
    if (!UserContext.instance) {
      UserContext.instance = new UserContext();
    }
    return UserContext.instance;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getUser(): User {
    return this.user;
  }

  public getUsername(): string {
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  public clearUser(): void {
    this.user = {
      email: "",
      establishment: "",
      first_name: "",
      last_name: "",
      phone: "",
      photo_link: "",
      type: "",
    };
  }
}
  