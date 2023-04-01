import { createContext, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const router = useRouter();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    document.cookie = "user" + "=" + data + ";path=/";
    router.push("/project");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  const isAuthenticated = user !== null; // verifica si el usuario está autenticado

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated, // agrega la propiedad isAuthenticated al valor del contexto
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
