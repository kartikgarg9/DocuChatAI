// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserType } from "../types";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (user: UserType) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
