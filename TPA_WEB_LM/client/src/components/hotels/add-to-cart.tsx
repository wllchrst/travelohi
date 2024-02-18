import { FormEvent, useState } from "react"
import { useUserAuth } from "../../contexts/user-context"
import { addHotelToCart } from "../../functions/hotel"
import IHotelReponse from "../../interfaces/hotel-response-interface"
import IHotelRoomType from "../../interfaces/hotel-room-type-interface"
import { FlexGap } from "../wrapper/FlexGap"
import Button from "../wrapper/button"
import Input from "../wrapper/input"
import { SubTitle } from "../wrapper/subtitle"

interface Props {
    hotel : IHotelReponse
    roomType : IHotelRoomType
}

export default function AddHotelToCart ({ hotel, roomType } : Props) {
    const {user} = useUserAuth()
    const [checkInDate, setCheckIndate] = useState<Date>()
    const [checkOutDate, setCheckOutDate] = useState<Date>()

    const clickHandle = () => {
        if(checkInDate && checkOutDate) addHotelToCart(hotel, roomType, user, checkInDate, checkOutDate).then((result) => {
            if(result) window.location.reload()
        })
        else {
            alert("you must input all check in and check out date");
        }
    }
    return (
        <div className="flex flex-col gap-1">
            <div>
                <p>Check In</p>
                <Input onChange={(event) => {
                    setCheckIndate(new Date(event.target.value))
                }} type="date" className="mt-1"></Input>
            </div>
            <div>
                <p>Check Out</p>
                <Input onChange={(event) => {
                    setCheckOutDate(new Date(event.target.value))
                }} type="date" className="mt-1"></Input>
            </div>
            <Button className="center" onClick={clickHandle}><SubTitle>Add To Cart</SubTitle></Button>
        </div>
    )
}
