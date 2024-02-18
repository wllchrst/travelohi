import IFlightResponse from "../../interfaces/flight-response-interface";
import { Container } from "../wrapper/container";
import { FlexGap } from "../wrapper/FlexGap";
import "../../styles/flight-detail-card.scss"
import { convertMinutesToHoursAndMinutes, dateConvert, isDateInPast, timeConvert } from "../../game/util";
import { HotelImageDiv } from "../wrapper/DivForImage";
import useCurrencyContext from "../../hooks/use-currency-context";
import styled from "styled-components";
import { useState } from "react";
import { GreenButton } from "../wrapper/green-button";
import { BlueButton } from "../wrapper/blue-button";
import { useUserAuth } from "../../contexts/user-context";
import Modal from "../hotels/modal";
import PriceWrapper from "../wrapper/price-wrapper";
import FlightCheckOut from "../flights/flight-check-out";
import IHotelRoomType from "../../interfaces/hotel-room-type-interface";
import ICartFlightTicketResponse from "../../interfaces/cart-flight-response-interface";
import { RedButton } from "../wrapper/red-button";
import { removeCartFlight } from "../../functions/flight";
import { SubTitle } from "../wrapper/subtitle";

interface IFlightDetailCard { 
    flight : IFlightResponse
    cart : ICartFlightTicketResponse
}

export default function FlightCartDetailCard ({ flight, cart} : IFlightDetailCard) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    }

    const deleteHandle = () => {
        if(confirm("Are you sure you want to delete flight from cart?")) { 
            removeCartFlight(cart.CartID).then((result) => {
                if(result) window.location.reload()
            })
        }        
    }

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
                        <p className="x-large bolder"><PriceWrapper price={cart.FlightSeat.Price}/></p>
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
                <div className="mt-2">
                    <SubTitle>Status : {isDateInPast(flight.DepartureTime) ? 'Expired' : 'Not Expired'}</SubTitle>
                </div>
                {(isDateInPast(flight.DepartureTime) == false) && 
                    <div className="mt-2 flex justify-between">
                        <GreenButton onClick={() => {openModal()}}>Buy Now</GreenButton>
                        <RedButton onClick={() => deleteHandle()}>Delete From Cart</RedButton>
                    </div>
                }
            </FlightDetailContainer>

            <Modal isOpen={isModalOpen} onClose={closeModal}>   
                <FlightCheckOut cart={cart}></FlightCheckOut>
            </Modal> 
        </Container>
    )
}
