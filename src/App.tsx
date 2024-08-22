import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import Home from "./hooks/pages/Home";
import RegisterPage from "./hooks/pages/Users/RegisterPage";
import SignInPage from "./hooks/pages/Users/SignInPage";
import { UserType } from "./types";
import ChatPage from "./hooks/pages/Users/ChatPage";

function App() {
  const userFromStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState<UserType | null>(
    userFromStorage ? JSON.parse(userFromStorage) : null
  );
  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={ <ChatPage/>} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;