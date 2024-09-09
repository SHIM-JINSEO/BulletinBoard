import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
type Auth = {
  isLogin: boolean | null;
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};
const AuthContext = createContext<Auth | undefined>(undefined);

function useAuthProvider() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  const loginUser = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      axios.post("/api/auth/login", {
        email: email,
        password: password,
      }),
    onSuccess(data, variables) {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("expiresln", data.data.expiresln);
      localStorage.setItem("userEmail", variables.email);
    },
    onError(err) {
      console.log(err);
      alert("ID or Password is wrong");
    },
  });
  const auth: Auth = {
    isLogin: isLogin,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    email: localStorage.getItem("email"),
    login: (email: string, password: string) => {
      loginUser.mutate({ email, password });
      setIsLogin(true);
    },
    logout: () => {
      localStorage.clear();
      setIsLogin(false);
    },
  };

  return auth;
}
type props = {
  children: ReactNode;
};
export default function AuthProvier({ children }: props) {
  const value = useAuthProvider();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Plese use AuthProvider");
  }
  return context;
}
