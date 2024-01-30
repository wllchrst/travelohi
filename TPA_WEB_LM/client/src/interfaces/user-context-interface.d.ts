import { IUser } from "./user-interface";

export interface IUserContext {  
    user : IUser
    setAuth : React.Dispatch<React.SetStateAction<boolean>>
    isAuth : () => boolean
    setUser: React.Dispatch<React.SetStateAction<IUser>>
    IsFetching : boolean
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
}
