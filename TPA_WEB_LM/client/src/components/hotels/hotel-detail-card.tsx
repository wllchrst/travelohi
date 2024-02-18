import styled from "styled-components"
import IHotelReponse from "../../interfaces/hotel-response-interface"
import { HotelImageDiv } from "../wrapper/DivForImage"
import "../../styles/hotel-detail-card.scss"
import { Title } from "../wrapper/title"
import { SubTitle } from "../wrapper/subtitle"
import { FlexGap } from "../wrapper/FlexGap"
import locationIcon from "../../assets/locationIcon.png"
import { FlexGapSmall } from "../wrapper/flex-gap-small"
import ratingIcon from "../../assets/ratingIcon.png"
import useCurrencyContext from "../../hooks/use-currency-context"
import { useEffect, useState } from "react"
import Button from "../wrapper/button"

interface IHotelDetailCard{
    hotel : IHotelReponse
} 

export default function HotelDetailCard( { hotel } : IHotelDetailCard) {
    const [index, setIndex] = useState(0) 

    const scrollDown = () => {
        window.scrollTo({
            top: 1000,
            behavior: 'smooth' // You can use 'auto' or 'smooth' for smooth scrolling
        });
    }
    useEffect(() => {
        let maximum = 0
        let currentIndex = 0
        const length = hotel.HotelRoomType.length

        for(let i = 0; i < length; i++){ 
            const roomType = hotel.HotelRoomType[i]
            if(roomType.Price > maximum){
                currentIndex = i
                maximum = roomType.Price
            }
        }

        setIndex(currentIndex)
    }, [])
    

    const Container = styled.div`
        width: 100%;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-shadow: 5px 5px 10px ${p => p.theme.shadow};
    `


    return (
        <Container>
            <div className="p-2">
                <Title className="mp-0">{hotel.HotelName}</Title>
                <div className="flex bottom-title-container">
                    <div className="left-container">
                        <FlexGapSmall className="mp-0 hover-effects">
                            <p>5/5</p>
                            <img className="rating-icon" src={ratingIcon} alt="" />
                        </FlexGapSmall>
                    </div>
                    <div>
                        <Button><SubTitle onClick={() => scrollDown()}>Rooms</SubTitle></Button>
                    </div>
                </div>            
            </div>
            <div className="left-container">
                <div className="main-image-container">
                    <div className="main-image">
                        <HotelImageDiv>
                            <img src={hotel.HotelPictures[0].PictureLink} alt="" />
                        </HotelImageDiv>
                    </div>
                </div>
                <div className="sub-image-container">
                    <div className="sub-image">
                        <HotelImageDiv>
                            <img src={hotel.HotelPictures[1].PictureLink} alt="" />
                        </HotelImageDiv>
                    </div>
                    <div className="sub-image">
                        <HotelImageDiv>
                            <img src={hotel.HotelPictures[2].PictureLink} alt="" />
                        </HotelImageDiv>
                    </div>
                </div>
            </div>
            <div className="p-1 flex flex-col gap-1">
                <Title>Hotel Facilities</Title>
                <div className="facility-grid">
                    {hotel.HotelFacilities.map((rf, index) => (
                        <div key={index} className="facility-grid-item">
                            {rf.FacilityDescription}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}
