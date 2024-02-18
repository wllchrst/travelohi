import IHotelTicketResponse from "../../interfaces/hotel-ticket-response-interface"
import HotelTicketCard from "./hotel-ticket-card"
import searchIcon from "../../assets/searchIcon.png"
import { useState } from "react"
interface I {
    hotelTickets : IHotelTicketResponse[]
    onHistory : boolean
    setFindHotel : React.Dispatch<React.SetStateAction<string>>
}
export default function HotelTicketPage ({ hotelTickets, onHistory, setFindHotel } : I) {
    const [Query, setQuery] = useState('')
    const searchHandle = () => {
        setFindHotel(Query)
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="search-container w-4k justify-between p-3">
                <input type="text" className="large" onChange={(o) => setQuery(o.target.value)}/>
                <img src={searchIcon} alt="" onClick={searchHandle}/>
            </div>
            {hotelTickets.map((ticket, index) => (
                <HotelTicketCard onHistory={onHistory} hotelTicket={ticket} key={index}/>
            ))}
        </div>
    )
}
