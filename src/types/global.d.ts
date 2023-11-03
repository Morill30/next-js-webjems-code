export {};

declare global {
  type MessageData = {
    user?: User;
    message: string;
    userId?: number | undefined;
    // Only used in client side
    connectionObject?: ConnectionObject;
  };

  type User = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };

  type ConnectionObject = {
    userId: number | undefined;
    user: User | undefined;
    friendId?: number | undefined;
    groupChatName?: string;
  };
}
