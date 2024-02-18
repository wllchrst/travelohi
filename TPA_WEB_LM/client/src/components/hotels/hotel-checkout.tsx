import { useState } from "react";
import { dateConvert, getDaysDifference, timeConvert } from "../../game/util";
import ICartHotelTicketResponse from "../../interfaces/cart-hotel-response-interface";
import { FlexGap } from "../wrapper/FlexGap";
import { BlueButton } from "../wrapper/blue-button";
import Button from "../wrapper/button";
import Input from "../wrapper/input";
import { SubTitle } from "../wrapper/subtitle";
import UpdateHotelCart from "../../interfaces/update-hotel-interface";
import { buyHotelTicket, updateHotelCart } from "../../functions/hotel";
import { GreenButton } from "../wrapper/green-button";
import { PaymentMethod } from "../../enums/payment-enum";
import Select from "../wrapper/select";

interface I {
    cart : ICartHotelTicketResponse
}

export default function HotelCheckOut ({ cart } : I) {
    const [hotelDate, sethotelDate] = useState<UpdateHotelCart>({} as UpdateHotelCart)
    const [method, setMethod] = useState(PaymentMethod.credit);
    const updateHandle = () => {
        console.log(hotelDate);
        updateHotelCart(hotelDate, cart.CartID).then((result) => {
            console.log(result);
        })
    }

    function buyHandle(){ 
        buyHotelTicket(cart, method).then((result) => {
            if(result) window.location.reload()
        })
    }
    
    return (
        <div className="p-2 flex flex-col gap-1">
            <FlexGap>
                <SubTitle>Check In Date : </SubTitle>
                <SubTitle>{dateConvert(cart.CheckInDate)}</SubTitle>
            </FlexGap>
            <FlexGap>
                <SubTitle>Check Out Date : </SubTitle>
                <SubTitle>{dateConvert(cart.CheckOutDate)}</SubTitle>
            </FlexGap>
            <div>
                <SubTitle>Update Check In and Check Out Date</SubTitle>
                <br />
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
            <BlueButton onClick={() => updateHandle()}>Update</BlueButton>
            <hr />
            <SubTitle>Booking Information</SubTitle>
            <FlexGap>
                <SubTitle>Total Days: </SubTitle>
                <SubTitle>{getDaysDifference(cart.CheckInDate, cart.CheckOutDate)}</SubTitle>
            </FlexGap>
            <FlexGap>
                <SubTitle>Room Price: </SubTitle>
                <SubTitle>{cart.RoomType.Price}</SubTitle>
            </FlexGap>
            <FlexGap>
                <SubTitle>Total Price: </SubTitle>
                <SubTitle>{cart.RoomType.Price * getDaysDifference(cart.CheckInDate, cart.CheckOutDate)}</SubTitle>
            </FlexGap>
            <Select onChange={(o) => {
                setMethod(o.target.value as PaymentMethod)
            }}>
                <option value={PaymentMethod.credit}>{PaymentMethod.credit}</option>
                <option value={PaymentMethod.wallet}>{PaymentMethod.wallet}</option>
            </Select>
            <GreenButton onClick={() => buyHandle()}>Buy</GreenButton>
        </div>
    )
}
