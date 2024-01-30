import { useContext } from "react"
import { CurrencyContext } from "../contexts/currency-context"

export default function useCurrencyContext(){ 
    return useContext(CurrencyContext)
}
