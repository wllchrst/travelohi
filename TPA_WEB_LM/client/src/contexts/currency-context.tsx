import { createContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { CurrencyEnum } from "../enums/currency-enums";

interface ICurrencyContext {
    changeCurrency : () => void
    currencyFront : string
    currencyMultiplier : number
}

export const CurrencyContext =  createContext<ICurrencyContext>({
    currencyFront : "$",
    currencyMultiplier: 1
} as ICurrencyContext)

export default function ChangeContextProvider ({children} : IChildren) {
    const [currencyFront, setcurrencyFront] = useState("$")
    const [currencyMultiplier, setcurrencyMultiplier] = useState(1)

    const changeCurrency = () =>  {
        console.log('changin');
        if(currencyFront == CurrencyEnum.US_FRONT) {
            setcurrencyFront("Rp.")
            setcurrencyMultiplier(14000)
        }
        else {
            setcurrencyFront("$")
            setcurrencyMultiplier(1)
        }
    }

    const value = { currencyFront, currencyMultiplier, changeCurrency }

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    )
}
