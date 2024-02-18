import IFlightTicketResponse from "../../interfaces/flight-ticket-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import Button from "../wrapper/button"
import Input from "../wrapper/input"
import FlightTicketCard from "./flight-ticket-card"
import searchIcon from "../../assets/searchIcon.png"
import { useState } from "react"

interface I {
    flightTickets : IFlightTicketResponse[]
    onHistory : boolean
    setFindFlight : React.Dispatch<React.SetStateAction<string>>
}
export default function FlightTicketPage ( { flightTickets, onHistory, setFindFlight } :  I ) {
    const [Query, setQuery] = useState('')
    const searchHandle = () => {
        setFindFlight(Query)
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="search-container w-4k justify-between p-3">
                <input type="text" className="large" onChange={(o) => setQuery(o.target.value)}/>
                <img src={searchIcon} alt="" onClick={searchHandle}/>
            </div>
            {flightTickets.map((ticket, index) => (
                <FlightTicketCard onHistory={onHistory} flightTicket={ticket} key={index}></FlightTicketCard>
            ))}
        </div>
    )
}
