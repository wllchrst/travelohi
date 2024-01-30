import { createContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";

interface IChangeContext {
    changeHappen : () => void
    effect : number
}

export const ChangeContext =  createContext<IChangeContext>({} as IChangeContext)

export default function ChangeContextProvider ({children} : IChildren) {
    
    const [effect, setEffect] = useState(0)
    function changeHappen(){ 
        setEffect(effect+ 1)
    }

    const value = { effect , changeHappen}
    return (
        <ChangeContext.Provider value={value}>
            {children}
        </ChangeContext.Provider>
    )
}
