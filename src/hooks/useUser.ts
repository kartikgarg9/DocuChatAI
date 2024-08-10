// src/hooks/useUser.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSessionStorage } from "./useSessionStorage";
import { UserType } from "../types";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItemSession, removeItemSession } = useSessionStorage();

  const addUser = (user: UserType) => {
    setUser(user);
    setItemSession("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItemSession("user");
  };

  return { user, addUser, removeUser };
};
