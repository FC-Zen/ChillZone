type NotificationSettings = {
  command: boolean;
  reservation: boolean;
  event: boolean;
};

type User = {
  email: string;
  establishment: string;
  first_name: string;
  last_name: string;
  phone: string;
  photo_link: string;
  type: string;
  notifications: NotificationSettings;
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
    notifications: {
      command:false,
      reservation: false,
      event: false,
    },
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

  public getNotificationSetting(): NotificationSettings {
    return this.user.notifications;
  }

  public setNotificationSetting(notificationSetting : NotificationSettings) {
    this.user.notifications = notificationSetting;
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
      notifications: {
        command:false,
        reservation: false,
        event: false,
      },
    };
  }
}
  