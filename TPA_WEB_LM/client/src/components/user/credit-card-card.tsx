import ICreditCard from "../../interfaces/credit-card-interface"
import { FlexGap } from "../wrapper/FlexGap"
import { SubTitle } from "../wrapper/subtitle"

interface I {
    credit : ICreditCard
}
export default function CreditCardCard ({ credit } : I) {
    return (
        <div>
            <FlexGap><SubTitle>Bank Name : {credit.BankName}</SubTitle></FlexGap>
            <FlexGap><SubTitle>Credit Card Number : {credit.CreditCardNumber }</SubTitle></FlexGap>
        </div>
    )
}
