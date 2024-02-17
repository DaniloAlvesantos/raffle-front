/* eslint-disable @typescript-eslint/ban-types */
import { useGoogleLogin } from "@react-oauth/google";
import { ReactNode, createContext, useState } from "react";
import { initialState } from "./utils";
import { api } from "../api/api";

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  number: string;
  cpf: string;
};

export interface AuthContextProps {
  Login: () => void;
  CreateUser: () => void;
  setUser: Function;
  user: User;
  userErr: boolean;
  jwt: string;
}

interface AuthContextProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProvider) {
  const [user, setUser] = useState<User>({ ...initialState });
  const [userErr, setUserErr] = useState<boolean>(false);
  const [jwt, setJwt] = useState("");

  const Login = useGoogleLogin({
    onSuccess: async (response) => {
      const { access_token } = response;
      try {
        const userResponse = await api.post("/login/user", {
          access_token,
        });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userResponse.data.token}`;
        setUser(userResponse.data.user);
        setJwt(userResponse.data.token);
      } catch (err) {
        console.log(err);
        setUserErr(true);
      } finally {
        setUserErr(false);
      }
    },
    onError: (err) => console.log(err),
  });

  const CreateUser = useGoogleLogin({
    onSuccess: async (response) => {
      const { access_token } = response;
      const { cpf, number } = user;
      try {
        const userResponse = await api.post("/create/user", {
          access_token,
          number,
          cpf,
        });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userResponse.data.token}`;
        setUser(userResponse.data.user);
        setJwt(userResponse.data.token);
      } catch (err) {
        console.log(err);
        setUserErr(true);
      } finally {
        setUserErr(false);
      }
    },
    onError: (err) => console.log(err),
  });

  return (
    <AuthContext.Provider
      value={{ Login, user, setUser, userErr, CreateUser, jwt }}
    >
      {children}
    </AuthContext.Provider>
  );
}
