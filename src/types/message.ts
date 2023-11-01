type MessageData = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  message: string;
  userId?: number;
  friendId?: number | string | undefined;
};
