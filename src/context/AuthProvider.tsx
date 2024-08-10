// src/context/AuthProvider.tsx
import React, { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";
import { UserType } from "../types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
