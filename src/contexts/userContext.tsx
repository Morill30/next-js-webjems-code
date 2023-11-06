import { SessionData } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  authUser?: Session;
  strapiUser?: any;
};

const Context = createContext<User>({});

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User>({});
  const { data: session, status }: SessionData = useSession();

  useEffect(() => {
    if (session) {
      setUser({
        authUser: session,
      });
      axios.get(`/api/user/${session?.id}`).then((response) => {
        setUser({
          authUser: session,
          strapiUser: response?.data?.data?.[0],
        });
      });
    }
  }, [session]);

  return <Context.Provider value={user}>{children}</Context.Provider>;
}

export function useUserContext() {
  return useContext(Context);
}
