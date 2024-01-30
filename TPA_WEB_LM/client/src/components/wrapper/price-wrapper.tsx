import useCurrencyContext from "../../hooks/use-currency-context"
import { SubTitle } from "./subtitle"

interface I { 
    price : number
}
export default function PriceWrapper ( { price } : I) {
    const { currencyFront, currencyMultiplier } = useCurrencyContext()
    const priceDisplay = `${currencyFront} ${price * currencyMultiplier}`
    console.log(currencyFront);
    console.log(currencyMultiplier);
    return (
        <p>{priceDisplay}</p>
    )
}
