import { SessionData } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  authUser?: Session | null;
  strapiUser?: any;
};

type UserContext = {
  user: User;
  updateOnlineUser: () => void;
};

const Context = createContext<UserContext>({
  user: {},
  updateOnlineUser: () => {},
});

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User>({});
  const { data: session, status }: SessionData = useSession();

  const updateOnlineUser = () => {
    axios
      .get(`/api/user/${session?.id}?populate=displayName,profileImage`)
      .then((response) => {
        const strapiUserResponse = response?.data?.data;
        localStorage.setItem("strapi-user", JSON.stringify(strapiUserResponse));
        setUser({
          authUser: session,
          strapiUser: strapiUserResponse,
        });
      });
  };

  useEffect(() => {
    if (session) {
      setUser({
        authUser: session,
      });

      const localStrapiuser = localStorage.getItem("strapi-user");

      const strapiUser =
        localStrapiuser !== "undefined" || localStrapiuser !== null
          ? JSON.parse(localStorage.getItem("strapi-user" || "") as string)
          : undefined;

      if (!strapiUser) {
        updateOnlineUser();
      } else {
        setUser({
          authUser: session,
          strapiUser: strapiUser,
        });
      }
    }
  }, [session]);

  return (
    <Context.Provider value={{ user, updateOnlineUser }}>
      {children}
    </Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}
