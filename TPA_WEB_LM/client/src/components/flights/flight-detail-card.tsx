import IFlightResponse from "../../interfaces/flight-response-interface";
import { Container } from "../wrapper/container";
import { FlexGap } from "../wrapper/FlexGap";
import "../../styles/flight-detail-card.scss"
import { convertMinutesToHoursAndMinutes, dateConvert, timeConvert } from "../../game/util";
import { HotelImageDiv } from "../wrapper/DivForImage";
import useCurrencyContext from "../../hooks/use-currency-context";
import styled from "styled-components";
import { useState } from "react";
import { GreenButton } from "../wrapper/green-button";
import BuyNow from "./buy-now-flight";
import { BlueButton } from "../wrapper/blue-button";
import { useUserAuth } from "../../contexts/user-context";
import Modal from "../hotels/modal";
import PriceWrapper from "../wrapper/price-wrapper";
import AddFlightToCart from "./add-flight-to-cart";

interface IFlightDetailCard { 
    flight : IFlightResponse
    inCart : boolean
}

export default function FlightDetailCard ({ flight, inCart } : IFlightDetailCard) {
    const { user } = useUserAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCartModalOpen, setCartIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCartIsModalOpen(false)
        setIsModalOpen(false);
    };

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
                    <div className="flex-col gap-1 flex">
                        <p>{flight.Airline.AirlineName}</p>
                        <p className="hover-effects smaller">{flight.AirplaneCode}</p>
                    </div>
                </div>
                <div className="general-right-container">
                    {/* time */}
                    <div className="time-information-container">
                        <div className="time-container">
                            <p>{timeConvert(flight.DepartureTime)}</p>
                            <p className="airport-name">{flight.AirportOrigin.AirportName}</p>
                        </div>
                        <hr className="w-0"/>
                        <div className="time-container">
                            <p>{timeConvert(flight.DepartureTime, flight.ArrivalTime)}</p>
                            <p className="airport-name">{flight.AirportDestination.AirportName}</p>
                        </div>
                    </div>
                    <p>{convertMinutesToHoursAndMinutes(flight.ArrivalTime)}</p>
                    {/* price */}
                    <div className="price-container">
                        <p className="x-large bolder"><PriceWrapper price={flight.FlightSeats[0].Price}/></p>
                        <p>/ticket</p>
                    </div>
                </div>
            </div>
            <FlightDetailContainer>
                <hr />
                <div className="information-container">

                    <div className="information-container-detail">
                        <p className="desc-p">ORIGIN</p>
                        <p className="time">{dateConvert(flight.DepartureTime)}, {timeConvert(flight.DepartureTime)}</p>
                        <p className="airport-name">{flight.AirportOrigin.AirportName}</p>
                    </div>
                    <div className="information-container-detail">
                        <p className="desc-p">TRANSITS</p>
                        {flight.Transits.map((transit, index) => (
                            <div key={index}>
                                <FlexGap>
                                    <p className="time">{dateConvert(transit.From)}, {timeConvert(flight.DepartureTime)}</p>
                                    <hr className="w-3"/>
                                    <p className="time">{dateConvert(transit.Until)}, {timeConvert(flight.DepartureTime)}</p>
                                </FlexGap>
                                <p className="airport-name">{transit.AirportTransit.AirportName}</p>
                            </div>
                        ))}   
                    </div>    
                    <div className="information-container-detail">
                        <p className="desc-p">DESTINATION</p>
                        <p className="time">{dateConvert(flight.DepartureTime)}, {timeConvert(flight.DepartureTime, flight.ArrivalTime)}</p>
                        <p className="airport-name">{flight.AirportDestination.AirportName}</p>
                    </div>
                </div>
            </FlightDetailContainer>

            {user.Role != "admin" ? <div className="flex gap-3 mt-1">
                {inCart ? <></> :<BlueButton onClick={() => {
                    setCartIsModalOpen(true)
                }}>Add To Cart</BlueButton>}
                <GreenButton onClick={() => openModal()}>Buy Now</GreenButton>
            </div> : <></>}
            
            <Modal isOpen={isCartModalOpen} onClose={closeModal}>
                <AddFlightToCart flight={flight}></AddFlightToCart>
            </Modal>
            
            <Modal isOpen={isModalOpen} onClose={closeModal}>   
                <BuyNow flight={flight}></BuyNow>
            </Modal> 
        </Container>
    )
}
