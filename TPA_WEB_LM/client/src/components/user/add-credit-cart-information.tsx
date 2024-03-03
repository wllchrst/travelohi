import { ChangeEvent, useState } from "react"
import { IUser } from "../../interfaces/user-interface"
import Input from "../wrapper/input"
import ICreditCard from "../../interfaces/credit-card-interface"
import Button from "../wrapper/button"
import { createCreditCart } from "../../functions/transaction"

interface I {
    user : IUser
}
export default function AddCreditCard ({ user } : I) {
    const [first, setfirst] = useState({} as ICreditCard)

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setfirst({
            ...first, 
            [event.target.name] : event.target.value
        })
    }

    const submitHandle = () => {
        createCreditCart(user, first).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <Input placeholder="Bank Name" name="BankName" onChange={changeHandle}/>
            <Input placeholder="Credit Card Number" name="CreditCardNumber" onChange={changeHandle}/>
            <div className="w-50per">
                <Button onClick={submitHandle}>Add Credit Card</Button>
            </div>
        </div>
    )
}
