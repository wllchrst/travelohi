import { useParams } from "react-router-dom"
import useFetchSearch from "../hooks/use-fetch-search";
import ViewHotel from "../admin-page/view-hotel-page";
import { Container } from "../components/wrapper/container";
import { Title } from "../components/wrapper/title";
import ViewFlight from "../admin-page/view-flight-page";
import { useState } from "react";

export default function SearchPage () {
    const { query } = useParams();
    const [flightView , setFlightView] = useState(true)
    if(query == undefined) return <></>

    const { hotels, flights } = useFetchSearch(query)
    return (
        <div>
            <div className="p-5 pb-0 flex flex-col gap-2">
                <Container className="p-2">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <Title onClick={() => {
                                setFlightView(true) 
                            }} className="underline-effects">Flight Tickets</Title>
                            <Title onClick={() => {
                                setFlightView(false)
                            }} className="underline-effects">Hotel Tickets</Title>
                        </div>
                        <Title>Search</Title>
                    </div>
                </Container>
            </div>
            {flightView ? <ViewFlight flightSearch={flights}></ViewFlight> : <ViewHotel searchHotel={hotels}></ViewHotel>}
        </div>
    )
}
