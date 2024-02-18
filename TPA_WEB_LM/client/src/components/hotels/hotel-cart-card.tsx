
import styled from "styled-components"
import IHotelReponse from "../../interfaces/hotel-response-interface"
import "../../styles/hotel-card.scss" 
import { HotelImageDiv } from "../wrapper/DivForImage"
import { FlexGap } from "../wrapper/FlexGap"
import locationIcon from "../../assets/locationIcon.png"
import ratingIcon from "../../assets/ratingIcon.png"
import { SubTitle } from "../wrapper/subtitle"
import { Title } from "../wrapper/title"
import { FlexGapSmall } from "../wrapper/flex-gap-small"
import { useUserAuth } from "../../contexts/user-context"
import { Link } from "react-router-dom"
import { PrimaryBackground, SecondaryColor } from "../wrapper/secondary"
import ICartHotelTicketResponse from "../../interfaces/cart-hotel-response-interface"
import { GreenButton } from "../wrapper/green-button"
import { RedButton } from "../wrapper/red-button"
import Modal from "./modal"
import HotelCheckOut from "./hotel-checkout"
import { useState } from "react"
import { isDateInPast } from "../../game/util"

interface HotelCard {
    hotel : IHotelReponse
    cart : ICartHotelTicketResponse
}

export default function HotelCartCard ({hotel, cart} : HotelCard) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    }

    const Container = styled.div`
        border-radius: 10px;
        display: flex;
        background-color: ${p => p.theme.primary};
        box-shadow: 5px 5px 10px ${p => p.theme.shadow};
    `

    return (
        <Container>
            <div className="left-container">
                <div className="image-container h-3k">
                    <HotelImageDiv>
                        <img src={hotel.HotelPictures[0].PictureLink} alt="" />
                    </HotelImageDiv>
                </div>
                <div className="image-container h-2k">
                    <HotelImageDiv>
                        <img src={cart.RoomType.PictureLink} alt="" />
                    </HotelImageDiv>
                </div>
            </div>
            <div className="right-container">
                <SubTitle>{hotel.HotelName}</SubTitle>
                <FlexGap>
                    <img className="icon" src={locationIcon} alt="" />
                    <p>{hotel.Location.CityName}, {hotel.Location.CountryName}</p>
                </FlexGap>
                <FlexGap>
                    <p>Ratings</p>
                    <FlexGapSmall>
                        <p>5/5</p>
                        <img className="rating-icon" src={ratingIcon} alt="" />
                    </FlexGapSmall>
                </FlexGap>
                <div>
                    {hotel.Description}
                </div>

                <div>
                    <SubTitle>Status : {isDateInPast(cart.CheckInDate) ? 'Expired' : 'Not Expired'}</SubTitle>
                </div>
                {(isDateInPast(cart.CheckInDate) == false) &&
                    <FlexGap className="justify-between">
                        <GreenButton onClick={() => openModal()}>Buy Now</GreenButton>
                    </FlexGap>
                }
            </div>
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <HotelCheckOut cart={cart}/>
            </Modal>
        </Container>
    )
}
