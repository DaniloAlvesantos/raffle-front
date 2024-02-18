/* eslint-disable @typescript-eslint/ban-types */
import { ReactNode, createContext, useCallback, useState } from "react";
import { initialState } from "./utils";
import { api } from "../api/api";

export type User = {
  name: string;
  phone: string;
  cpf: string;
  email:string;
};

export interface AuthContextProps {
  Login: () => void;
  CreateUser: (userInfo: User) => void;
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

  const Login = useCallback(async () => {
    const { cpf } = user;
    if (user.name !== "guest") {
      setUser({ ...initialState });
    }
    try {
      const userResponse = await api.post(`/login/user`, { cpf });
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
  }, [user]);

  const CreateUser = useCallback(async (userInfo: User) => {
    const { cpf, phone, name, email } = userInfo;
    const data = {
      name,
      cpf,
      phone,
      email
    };

    try {
      const userResponse = await api.post("/create/user", data); // Remova as chaves em volta de data
      console.log(userResponse.data.token)
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
  }, []);

  return (
    <AuthContext.Provider
      value={{ Login, user, setUser, userErr, CreateUser, jwt }}
    >
      {children}
    </AuthContext.Provider>
  );
}
