import flightSearch from "../../assets/fligth-search-wallpaper.avif"
import { HotelImageDiv } from "../wrapper/DivForImage"
import { Container } from "../wrapper/container"

export default function FlightSearch () {
    return (
        <Container className="flex w-100per">
            <div className="image-container h-3k overflow-hidden w-40per">
                <HotelImageDiv>
                    <img src={flightSearch} alt="" />
                </HotelImageDiv>
            </div>
            <div>
            </div>
        </Container>
    )
}
