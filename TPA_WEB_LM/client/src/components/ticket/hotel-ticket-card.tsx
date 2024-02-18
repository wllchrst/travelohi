import styled from "styled-components"
import IHotelTicketResponse from "../../interfaces/hotel-ticket-response-interface"
import { HotelImageDiv } from "../wrapper/DivForImage"
import { SubTitle } from "../wrapper/subtitle"
import { FlexGap } from "../wrapper/FlexGap"
import ratingIcon from "../../assets/ratingIcon.png"
import locationIcon from "../../assets/locationIcon.png"
import { FlexGapSmall } from "../wrapper/flex-gap-small"
import { dateConvert } from "../../game/util"
import Button from "../wrapper/button"
import GiveHotelReview from "../hotels/give-hotel-review"
import GiveHotelRating from "../hotels/give-hotel-rating"
import Modal from "../hotels/modal"
import { useState } from "react"

interface I {
    hotelTicket : IHotelTicketResponse
    onHistory : boolean
}

export default function HotelTicketCard ({ hotelTicket, onHistory } : I) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setIsSecondModalOpen(false);
    }
    
    return (
        <div>
            <div className="flex">
                <div className="left-container">
                    <div className="image-container h-4k">
                        <HotelImageDiv>
                            <img src={hotelTicket.Hotel.HotelPictures[0].PictureLink} alt="" />
                        </HotelImageDiv>
                    </div>
                </div>
                <div className="right-container">
                    <SubTitle>{hotelTicket.Hotel.HotelName}</SubTitle>
                    <p>Ticket ID : {hotelTicket.TicketID}</p>
                    <FlexGap>
                        <img className="icon" src={locationIcon} alt="" />
                        <p>{hotelTicket.Hotel.Location.CityName}, {hotelTicket.Hotel.Location.CountryName}</p>
                    </FlexGap>
                    <p>Check in : {dateConvert(hotelTicket.CheckInDate)}</p>
                    <p>Check out : {dateConvert(hotelTicket.CheckOutDate)}</p>
                    <p>Room Type : {hotelTicket.RoomType.Description}</p>
                    { onHistory && <div className="flex gap-1">
                        <Button onClick={() => setIsSecondModalOpen(true)}>Give Rating</Button>
                        <Button onClick={() => openModal()}>Give Review</Button>
                    </div>}
                </div> 
            </div>
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <GiveHotelReview hotel={hotelTicket.Hotel}/>
            </Modal>
            <Modal onClose={closeModal} isOpen={isSecondModalOpen}>
                <GiveHotelRating hotel={hotelTicket.Hotel}/>
            </Modal>
        </div>
    )
}
