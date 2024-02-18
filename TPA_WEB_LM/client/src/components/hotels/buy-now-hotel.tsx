import { useEffect, useState } from "react";
import { dateConvert, getDaysDifference, timeConvert } from "../../game/util";
import ICartHotelTicketResponse from "../../interfaces/cart-hotel-response-interface";
import { FlexGap } from "../wrapper/FlexGap";
import { BlueButton } from "../wrapper/blue-button";
import Button from "../wrapper/button";
import Input from "../wrapper/input";
import { SubTitle } from "../wrapper/subtitle";
import UpdateHotelCart from "../../interfaces/update-hotel-interface";
import { buyHotelTicket, buyNowHotel, updateHotelCart } from "../../functions/hotel";
import { GreenButton } from "../wrapper/green-button";
import { PaymentMethod } from "../../enums/payment-enum";
import Select from "../wrapper/select";
import IHotelReponse from "../../interfaces/hotel-response-interface";
import IHotelRoomType from "../../interfaces/hotel-room-type-interface";
import { useUserAuth } from "../../contexts/user-context";

interface I {
    hotel : IHotelReponse
    roomType : IHotelRoomType
}

export default function HotelBuyNow ({ hotel, roomType } : I) {
    const [hotelDate, sethotelDate] = useState<UpdateHotelCart>({} as UpdateHotelCart)
    const [method, setMethod] = useState(PaymentMethod.credit);
    const [confirmed, setConfirmed] = useState(false)
    const { user } = useUserAuth()

    useEffect(() => {
        if(hotelDate.CheckInDate == undefined 
            || hotelDate.CheckOutDate == undefined) return;
        setConfirmed(true)
    }, [hotelDate])

    function buyHandle(){ 
        buyNowHotel(hotel, method, roomType, hotelDate.CheckInDate, hotelDate.CheckOutDate, user).then((result) => {
            if(result) window.location.reload()
        })
    }
    
    return (
        <div className="p-2 flex flex-col gap-1">
            <div>
                <FlexGap>
                    <Input type="date" onChange={(o) => {
                        sethotelDate({
                            ...hotelDate,
                            CheckInDate: new Date(o.target.value)
                        })
                    }}></Input>
                    <hr className="w-3k"/>
                    <Input type="date" onChange={(o) => {
                        sethotelDate({
                            ...hotelDate,
                            CheckOutDate: new Date(o.target.value)
                        })
                    }}></Input>
                </FlexGap>
            </div>
            <hr />
            {confirmed ? <> 
                <FlexGap>
                    <SubTitle>Room Price</SubTitle>
                    <SubTitle>{roomType.Price}</SubTitle>
                </FlexGap>
                <FlexGap>
                    <SubTitle>Total Days</SubTitle>
                    <SubTitle>{getDaysDifference(hotelDate.CheckInDate, hotelDate.CheckOutDate)}</SubTitle>
                </FlexGap>
                <FlexGap>
                    <SubTitle>Total Price</SubTitle>
                    <SubTitle>{roomType.Price * getDaysDifference(hotelDate.CheckInDate, hotelDate.CheckOutDate)}</SubTitle>
                </FlexGap>
                <Select onChange={(o) => {
                    setMethod(o.target.value as PaymentMethod)
                }}>
                    <option value={PaymentMethod.credit}>{PaymentMethod.credit}</option>
                    <option value={PaymentMethod.wallet}>{PaymentMethod.wallet}</option>
                </Select>
                <GreenButton onClick={() => buyHandle()}>Buy</GreenButton>
            </> : <></>}
        </div>
    )
}
