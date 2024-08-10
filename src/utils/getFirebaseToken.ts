// src/utils/getFirebaseToken.ts
import { getAuth } from "firebase/auth";

export const getFirebaseToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("Error getting Firebase token:", error);
      return null;
    }
  }
  return null;
};
