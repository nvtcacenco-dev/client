import React, { createContext, useState, useEffect } from "react";
import { FC } from "react";
import { User } from "../../utils/types";

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const UserContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    localStorage.setItem("token", token || "");
  }, [token]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
