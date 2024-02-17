import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/context";

export const useAuth = ():AuthContextProps => {
    const context = useContext(AuthContext);
    return context;
}