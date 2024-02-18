import { useState } from "react";
import { Container } from "../components/wrapper/container";
import Input from "../components/wrapper/input";
import { getTheFile } from "../game/util";
import { Title } from "../components/wrapper/title";
import Button from "../components/wrapper/button";
import useFetchRecommendation from "../hooks/use-fetch-recommendation";
import HotelCard from "../components/hotels/hotel-card";
import FlightCard from "../components/flights/flight-card";

export default function CheckLocationPage () {
    const [file, setFile] = useState<File>()
    const {hotels, flights, isLoading } = useFetchRecommendation();


    return (
        <div className="p-2">
            <Container className="p-2 flex flex-col gap-1">
                <Title>Input Location You Want To Visit</Title>
                <Input type="file" onChange={(o) => {
                    getTheFile(o, setFile)
                }}></Input>
                <div className="w-25per">
                    <Button>Search</Button>
                </div>
                <div>
            <Title>Flights</Title>
            <br />
            <div className="flex flex-col gap-1">
                {flights.map((flight, index) => (
                    <FlightCard key={index} flight={flight}></FlightCard>
                ))}
                </div>
            </div>
            <div>
                <Title>Hotels</Title>
                <br />
                <div className="flex flex-col gap-1">
                    {hotels.map((hotel, index) => (
                        <HotelCard inDetail={false} key={index} hotel={hotel}></HotelCard>
                    ))}
                </div>
            </div>
            </Container>
        </div>
    )
}
