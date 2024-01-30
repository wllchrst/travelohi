import styled from "styled-components"
import IFlightResponse from "../../interfaces/flight-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import { SubTitle } from "../wrapper/subtitle"
import { Title } from "../wrapper/title"
import { dateConvert, timeConvert } from "../../game/util"
import locationIcon from "../../assets/locationIcon.png"
import destinationIcon from "../../assets/destinationicon.png"
import { HotelImageDiv } from "../wrapper/DivForImage"
import "../../styles/flight-card.scss"
import Button from "../wrapper/button"
import { useNavigate } from "react-router-dom"
import useCurrencyContext from "../../hooks/use-currency-context"
import PriceWrapper from "../wrapper/price-wrapper"

interface IFlightCard {
    flight : IFlightResponse
}

export default function FlightCard ({ flight  } : IFlightCard) {
    const navigate = useNavigate()
    const currencyContext = useCurrencyContext()
    const Container = styled.div`
        border-radius: 5px;
        display: flex;
        padding: 2rem;
        width: 100%;
        background-color: ${p => p.theme.primary};
        box-shadow: 5px 5px 10px ${p => p.theme.shadow};
    `
    return (
        <Container>
            <div className="top-container">
            <div className="general-container">
                <div className="general-left-container">
                    <div className="airline-container">
                        <HotelImageDiv>
                            <img src={flight.Airline.PictureLink} alt="" />
                        </HotelImageDiv>
                    </div>
                    <p>Lion Air</p>
                </div>
                <div className="general-right-container">
                    {/* time */}
                    <div className="time-information-container">
                        <div className="time-container">
                            <p>{timeConvert(flight.DepartureTime)}</p>
                            <p className="airport-name">{flight.AirportOrigin.AirportName}</p>
                        </div>
                        <hr />
                        <div className="time-container">
                            <p>{timeConvert(flight.DepartureTime, flight.ArrivalTime)}</p>
                            <p className="airport-name">{flight.AirportDestination.AirportName}</p>
                        </div>
                    </div>
                    {/* price */}
                    <div className="price-container">
                        <p className="x-large bolder">
                            <PriceWrapper price={flight.FlightSeats[0].Price}/>
                        </p>
                        <p>/ticket</p>
                    </div>
                </div>
            </div>
                <div className="button-container">
                    <Button className="center" onClick={() => {
                        navigate("/view_flight/" + flight.FlightID)
                    }}><SubTitle>Details</SubTitle></Button>
                </div>
            </div>
        </Container>
    )
}
