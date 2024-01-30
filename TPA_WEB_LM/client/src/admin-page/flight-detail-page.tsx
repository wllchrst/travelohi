import { useParams } from "react-router-dom"
import "../styles/admin-flight-detail.scss"
import { useEffect, useState } from "react"
import Service from "../utils/service"
import IFlightResponse from "../interfaces/flight-response-interface"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import FlightDetailCard from "../components/flights/flight-detail-card"
import Loading from "../components/wrapper/loading"

export default function FlightDetail () {
    const service = new Service()
    const [flight, setFlight] = useState<IFlightResponse | null>(null)
    const { id } = useParams() 

    useEffect(() => {
        service.request<IFlightResponse>({
            url: Paths.GET_FLIGHT_DETAIL,
            method: Method.GET
        }, id).then((result) => {
            if(result.data) setFlight(result.data)
        })
    }, [])
    
    return (
        <div className="flight-detail-container">
            {!flight ? <Loading></Loading> : 
                <FlightDetailCard flight={flight}></FlightDetailCard>
            }
        </div>
    )
}
