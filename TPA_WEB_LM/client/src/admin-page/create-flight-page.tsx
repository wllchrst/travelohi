import axios from "axios"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Paths from "../enums/api-paths"
import Service from "../utils/service"
import { IEndpoint } from "../interfaces/endpoint-interface"
import { Method } from "../enums/method-enum"
import { Center } from "../components/wrapper/center"
import Button from "../components/wrapper/button"
import { Title } from "../components/wrapper/title"
import { BorderedContainer } from "../components/wrapper/bordered-container"
import Input from "../components/wrapper/input"
import IAirline from "../interfaces/airline-interface"
import IAirport from "../interfaces/airport-interface"
import Select from "../components/wrapper/select"
import { FlexGap } from "../components/wrapper/FlexGap"
import IFlight from "../interfaces/flight-interface"
import { v4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { SubTitle } from "../components/wrapper/subtitle"
import ITransit from "../interfaces/transit-interface"
import { FlexGapSmall } from "../components/wrapper/flex-gap-small"
import IFlightSeat from "../interfaces/flight-seat-interface"
import Seat from "../interfaces/seat-interface"
import { createFlight } from "../functions/flight"



export default function CreateFlight () {
    const service = new Service()
    const [airlines, setAirlines] = useState<IAirline[]>([])
    const [airports, setAirports] = useState<IAirport[]>([])
    const [flight, setFlight] = useState({} as IFlight)
    const [transit, setTransits] = useState<ITransit[]>([])
    const [currentTransit, setCurrentTransit] = useState<ITransit>({} as ITransit)
    const [airportTransits, setAirportTransits] = useState<string[]>([])
    const [currentAiport, setcurrentAiport] = useState('')
    const [businessSeat, setBusinessSeat] = useState<Seat>({} as Seat)
    const [firstClassSeat, setFirstClassSeat] = useState<Seat>({} as Seat)
    const [economy, setEconomy] = useState<Seat>({} as Seat)

    useEffect(() => {
        service.request<IAirline[]>({
            url: Paths.GET_ALL_AIRLINE, 
            method: Method.GET
        }).then((result) => {
            if(result.data) setAirlines(result.data)
            console.log(airlines);
        })

        service.request<IAirport[]>({
            url: Paths.GET_ALL_AIRPORT, 
            method: Method.GET
        }).then((result) => {
            console.log(result.data);
            if(result.data) setAirports(result.data)
        })
    }, [])    

    const submitHandle = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        createFlight(flight, transit, businessSeat, economy, firstClassSeat).then((result) => {
            console.log(result);
        })
    }

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFlight({
            ...flight, 
            [event.target.name] : event.target.value
        })
        console.log(flight);
    }

    return (
        <Center className="">
            <BorderedContainer className="form-container">
                <form onSubmit={submitHandle}>
                    <Title>Create Flight</Title>
                    <Select name="AirlineRefer" onChange={changeHandle}>
                        <option value="">Select Airline</option>
                        {airlines.map((airline, index) => (
                            <option key={index} value={airline.AirlineCode}>{airline.AirlineName}</option>
                        ))}
                    </Select>
                    <Select name="AirportCodeOrigin" onChange={changeHandle}>
                        <option value="">Select Airport Origin</option>
                        {airports.map((airport, index) => (
                            <option key={index} value={airport.AirportCode}>{airport.AirportName}</option>
                        ))}
                    </Select>
                    <Select name="AirportCodeDestination" onChange={changeHandle}>
                        <option value="">Select Airport Destination</option>
                        {airports.map((airport, index) => (
                            <option key={index} value={airport.AirportCode}>{airport.AirportName}</option>
                        ))}
                    </Select>
                    <FlexGap>
                        <p>Departure</p> 
                        <Input name="DepartureTime" type="datetime-local" onChange={(event) => {
                            console.log(new Date(event.target.value));
                            setFlight({
                                ...flight,
                                DepartureTime: new Date(event.target.value)
                                })
                        }}></Input>
                    </FlexGap>
                    <Input name="ArrivalTime" type="number" placeholder="Duration" onChange={(event) => {
                        setFlight({
                            ...flight,
                            ArrivalTime: parseInt(event.target.value)
                        })
                    }}></Input>
                    <FlexGapSmall>
                        <Input type="number" placeholder="Business Seat" onChange={(event) => {
                            setBusinessSeat({
                                ...businessSeat,
                                Total: parseInt(event.target.value)
                            })
                        }}/>
                        <Input type="number" placeholder="Price" onChange={(event) => {
                            setBusinessSeat({
                                ...businessSeat,
                                Price : parseInt(event.target.value)
                            })
                        }}/>
                    </FlexGapSmall>
                    <FlexGapSmall>
                        <Input type="number" placeholder="Economy Seat" onChange={(event) => {
                            setEconomy({
                                ...economy,
                                Total: parseInt(event.target.value)
                            })
                        }}/>
                        <Input type="number" placeholder="Price" onChange={(event) => {
                            setEconomy({
                                ...economy,
                                Price : parseInt(event.target.value)
                            })
                        }}/>
                    </FlexGapSmall>
                    <FlexGapSmall>
                        <Input type="number" placeholder="First Class Seat" onChange={(event) => {
                            setFirstClassSeat({
                                ...firstClassSeat,
                                Total: parseInt(event.target.value)
                            })
                        }}/>
                        <Input type="number" placeholder="Price" onChange={(event) => {
                            setFirstClassSeat({
                                ...firstClassSeat,
                                Price : parseInt(event.target.value)
                            })
                        }}/>
                    </FlexGapSmall>
                    <hr/>
                    <SubTitle>Add Transit</SubTitle>
                    <ul>
                        {transit.map((t, index) => (
                            <li key={index}>{t.AirportTransitRefer}</li>
                        ))}
                    </ul>
                    <Select name="AirportCodeDestination" onChange={(event) => {
                            setCurrentTransit({
                                ...currentTransit,
                                AirportTransitRefer: event.target.value
                            })
                    }}>
                        <option value={currentTransit.AirportTransitRefer}>Select Airport Transit</option>
                        {airports.map((airport, index) => (
                            <option key={index} value={airport.AirportCode}>{airport.AirportName}</option>
                        ))}
                    </Select>
                    <FlexGap>
                        <p>From</p>
                        <Input  placeholder="From" type="datetime-local" onChange={(event) => {
                            setCurrentTransit({
                                ...currentTransit,
                                From: new Date(event.target.value)
                            })
                        }}></Input>
                    </FlexGap>
                    <FlexGap>
                        <p>Until</p>
                        <Input placeholder="From" type="datetime-local" onChange={(event) => {
                            setCurrentTransit({
                                ...currentTransit,
                                Until: new Date(event.target.value)
                            })
                        }}></Input>
                    </FlexGap>
                    <Button onClick={(event) => {
                        event.preventDefault()
                        setTransits([...transit, currentTransit])
                        setAirportTransits([...airportTransits, currentAiport])
                    }}>Add Transit</Button>
                    <hr />
                    <Button type="submit">Add New Flight</Button>
                </form>
            </BorderedContainer>
        </Center>
    )
}
