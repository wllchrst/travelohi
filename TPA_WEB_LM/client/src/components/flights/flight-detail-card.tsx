import { useParams } from "react-router-dom";
import IFlightResponse from "../../interfaces/flight-response-interface";
import { Container } from "../wrapper/container";
import { Title } from "../wrapper/title";
import locationIcon from "../../assets/locationIcon.png"
import destinationIcon from "../../assets/destinationicon.png"
import arrowIcon from "../../assets/arrowIcon.png"
import { FlexGap } from "../wrapper/FlexGap";
import { SubTitle } from "../wrapper/subtitle";
import "../../styles/flight-detail-card.scss"
import { dateConvert, timeConvert } from "../../game/util";
import { HotelImageDiv } from "../wrapper/DivForImage";
import useCurrencyContext from "../../hooks/use-currency-context";
import styled from "styled-components";
import Select from "../wrapper/select";
import { SeatType } from "../../enums/seat-type-enum";
import { useState } from "react";
import { GreenButton } from "../wrapper/green-button";
import { AvailableFlight } from "./available-button";
import { NotAvailableButton } from "./not-available-button";
import Button from "../wrapper/button";
import BuyNow from "./buy-now-flight";
import { BlueButton } from "../wrapper/blue-button";
import { addFlightToCart } from "../../functions/flight";
import { useUserAuth } from "../../contexts/user-context";

interface IFlightDetailCard { 
    flight : IFlightResponse
}

export default function FlightDetailCard ({ flight } : IFlightDetailCard) {
    const { user } = useUserAuth()
    const [isBuyNow, setIsBuyNow] = useState(false)
    const FlightDetailContainer = styled.div`
        margin-top: 2rem;
        .information-container {
            display: flex;
            flex-direction: column;
            margin-top: 2rem;
            gap: 2rem;
            .time {
                font-size: large;
                margin-bottom: 0.3rem;
            }

            .airport-name {
                font-size: medium;
                opacity: 0.9;
            }

            .desc-p {
                margin-bottom: 0.3rem;
                text-decoration: underline;
            }
        } 
    `

    const addHandle = () => {
        if(!confirm("Are you sure")) return
        addFlightToCart(user, flight).then((result) => {
            if(result) window.location.reload()
        })
    }
    const currencyContext = useCurrencyContext()
    return (
        <Container className="p-3">
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
                        <p className="price">{currencyContext.currencyFront} </p>
                        <p>/ticket</p>
                    </div>
                </div>
            </div>
            <FlightDetailContainer>
                <hr />
                <div className="information-container">

                    <div className="information-container-detail">
                        <p className="desc-p">ORIGIN</p>
                        <p className="time">{dateConvert(flight.DepartureTime)}</p>
                        <p className="airport-name">{flight.AirportOrigin.AirportName}</p>
                    </div>
                    <div className="information-container-detail">
                        <p className="desc-p">TRANSITS</p>
                        {flight.Transits.map((transit, index) => (
                            <div key={index}>
                                <FlexGap>
                                    <p className="time">{dateConvert(transit.From)}</p>
                                    <hr className="w-3"/>
                                    <p className="time">{dateConvert(transit.Until)}</p>
                                </FlexGap>
                                <p className="airport-name">{transit.AirportTransit.AirportName}</p>
                            </div>
                        ))}   
                    </div>    
                    <div className="information-container-detail">
                        <p className="desc-p">DESTINATION</p>
                        <p className="time">{dateConvert(flight.DepartureTime)}</p>
                        <p className="airport-name">{flight.AirportDestination.AirportName}</p>
                    </div>
                </div>
            </FlightDetailContainer>
            <div className="flex gap-3 mt-1">
                <GreenButton onClick={() => setIsBuyNow(!isBuyNow)}>Buy Now</GreenButton>
                <BlueButton onClick={addHandle}>Add To Cart</BlueButton>
            </div>
            
            
            {isBuyNow ? <BuyNow flight={flight}></BuyNow> : <></>}
        </Container>
    )
}
