import { useState } from "react"
import { useUserAuth } from "../../contexts/user-context"
import { createRating } from "../../functions/transaction"
import IHotelReponse from "../../interfaces/hotel-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import { BlueButton } from "../wrapper/blue-button"
import Button from "../wrapper/button"
import Input from "../wrapper/input"

interface I {
    hotel : IHotelReponse
}

export default function GiveHotelRating ({ hotel } : I) {
    const { user } = useUserAuth()
    const [rate, setrate] = useState(0)

    const submitHandle = () => {
        createRating(user, hotel, rate).then((result) => {
            console.log(result);
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <FlexGap>
                <p>{hotel.HotelName}</p>
            </FlexGap>
            <FlexGap className="w-50per">
                <Input placeholder="1-5" type="number" onChange={(o) => setrate(parseInt(o.target.value))}></Input>
                <Button onClick={submitHandle}>Give Rating</Button>
            </FlexGap>
        </div>
    )
}
