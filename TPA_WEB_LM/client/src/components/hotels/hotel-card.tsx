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
import { calculateRating } from "../../game/util"

interface HotelCartCard {
    hotel : IHotelReponse
    inDetail : boolean
}

export default function HotelCard ({hotel, inDetail} : HotelCartCard) {

    const role = useUserAuth().user.Role
    
    const Container = styled.div`
        border-radius: 10px;
        display: flex;
        background-color: ${p => p.theme.primary};
        box-shadow: 5px 5px 10px ${p => p.theme.shadow};
    `

    const Button = styled.button`
        border: none;
        padding: 0.75rem;
        border-radius:5px;
        width: 25%;
        background-color: ${p => p.theme.secondary};
        text-decoration: none;
        color: ${p => p.theme.primary};
        a{
            text-decoration: none;
            color: ${p => p.theme.font};
            :hover {
                text-decoration: underline;
            }
        }
    `

    return (
        <Container>
            <div className="left-container">
                <div className="image-container h-4k">
                    <HotelImageDiv>
                        <img src={hotel.HotelPictures[0].PictureLink} alt="" />
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
                        <p>{hotel.Ratings.length > 0 ? calculateRating(hotel) + "/5" : "NO RATING"}</p>
                        <img className="rating-icon" src={ratingIcon} alt="" />
                    </FlexGapSmall>
                </FlexGap>
                <div>
                    {hotel.Description}
                </div>
                { inDetail ? <>
                    
                </> : <>
                    <br />
                    <br />
                    <div className="price-btn">
                        <Button>
                            <Link to={'/view-hotel/' + hotel.HotelID}>
                                {role == 'admin' ? 'Manage Hotel' : 'See Prices'}
                            </Link>
                        </Button>
                    </div>
                </>}
            </div>
        </Container>
    )
}
