import { useEffect, useState } from "react"
import IFlight from "../interfaces/flight-interface"
import Service from "../utils/service"
import IFlightResponse from "../interfaces/flight-response-interface"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import "../styles/view-flights.scss"
import styled from "styled-components"
import FlightCard from "../components/flights/flight-card"
import Loading from "../components/wrapper/loading"
import { SubTitle } from "../components/wrapper/subtitle"
import { FlexGap } from "../components/wrapper/FlexGap"
import Input from "../components/wrapper/input"
import FlightSearch from "../components/flights/flight-search"

export default function ViewFlight () {
    const [flights, setFlights] = useState<IFlightResponse[]>([])
    const service = new Service()
    useEffect(() => {
        service.request<IFlightResponse[]>({
            url: Paths.GET_ALL_FLIGHT,
            method: Method.GET
        }).then((result) => {
            if(result.data) setFlights(result.data)
        })
    }, [])

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        padding: 5rem;
        gap: 1rem;
    `

    const FirstContainer = styled.div`
        background-color: ${p => p.theme.primary};
        padding: 3rem;
        border-radius: 10px;
        width: 20%;
        box-shadow: 5px 5px 10px ${p => p.theme.shadow};
    `
    
    return (
        <Container>
            <div className="flex gap-2">
                <FirstContainer>
                    <div className="sub-container">
                            <SubTitle>Transit</SubTitle>
                            <FlexGap>
                                <input type="radio" name="transit-type"/>
                                <p>Yes</p>
                            </FlexGap>
                            <FlexGap>
                                <input type="radio" name="transit-type"/>
                                <p>No</p>
                            </FlexGap>
                            <br /><br />
                            <SubTitle>Duration</SubTitle>
                            <Input type="number"></Input>
                            <br /><br />
                            <SubTitle>Price</SubTitle>
                            <Input placeholder="Minimum" type="number"></Input>
                            <Input placeholder="Maximum" type="number"></Input>
                            <br /><br />
                            <SubTitle>Transits</SubTitle>
                            <Input placeholder="Minimum" type="number"></Input>
                        </div>
                        <br />
                        <br />
                </FirstContainer>
                <div className="flights-container">
                    {flights ? 
                        <>
                            {flights.map((flight, index) => (
                                <div key={index} className="flights-container">
                                    <FlightCard flight={flight}></FlightCard>
                                </div>
                            ))}
                        </>
                        : <Loading></Loading>
                    }
                </div>
            </div>
        </Container>
    )
}
