import { createContext, useContext, useState } from "react";
import { IUserContext } from "../interfaces/user-context-interface";
import { IUser } from "../interfaces/user-interface";
import useFetchUser from "../hooks/use-fetch-user";

const userContext = createContext({} as IUserContext);

type ContentLayout = {
    children: JSX.Element;
};

export function UserProvider({ children }: ContentLayout) {
    const [IsFetching, setIsFetching] = useState(true)
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState<IUser>({} as IUser)

    function isAuth() {
        return auth;
    }

    const data = { setAuth, isAuth, user, setUser, IsFetching, setIsFetching };

    return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function useUserAuth() {
    return useContext(userContext);
}
