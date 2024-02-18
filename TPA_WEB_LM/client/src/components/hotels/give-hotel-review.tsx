import { useState } from "react"
import { useUserAuth } from "../../contexts/user-context"
import { createRating, createReview } from "../../functions/transaction"
import IHotelReponse from "../../interfaces/hotel-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import { BlueButton } from "../wrapper/blue-button"
import Button from "../wrapper/button"
import Input from "../wrapper/input"

interface I {
    hotel : IHotelReponse
}

export default function GiveHotelReview ({ hotel } : I) {
    const { user } = useUserAuth()
    const [review, setReview] = useState('')
    const [isAnonymous, setIsAnonymous] = useState(false)

    const submitHandle = () => {
        createReview(user, hotel, review, isAnonymous).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <FlexGap>
                <p>{hotel.HotelName}</p>
            </FlexGap>
            <FlexGap className="w-50per">
                <Input placeholder="Review" type="text" onChange={(o) => setReview(o.target.value)}></Input>
            </FlexGap>
            <FlexGap>
                <input type="checkbox" onChange={() => setIsAnonymous(!isAnonymous)}/>
                <p>Stay Anonymous</p>
            </FlexGap>
            <Button onClick={submitHandle}>Give Rating</Button>
        </div>
    )
}
