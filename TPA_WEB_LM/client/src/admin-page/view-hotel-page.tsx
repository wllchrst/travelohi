import { useEffect, useState } from "react"
import IHotelReponse from "../interfaces/hotel-response-interface"
import Service from "../utils/service"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import HotelCard from "../components/hotels/hotel-card"
import styled from "styled-components"
import "../styles/view-hotels.scss"
import { BorderedContainer } from "../components/wrapper/bordered-container"
import { FlexGap } from "../components/wrapper/FlexGap"
import { SubTitle } from "../components/wrapper/subtitle"
import { Title } from "../components/wrapper/title"
import Input from "../components/wrapper/input"
import Button from "../components/wrapper/button"
import useFecthHotel from "../hooks/use-fetch-hotels"
import Loading from "../components/wrapper/loading"

const service = new Service()

export default function ViewHotel () {
    const { hotels, isLoading } = useFecthHotel()

    const Container = styled.div`
        display: flex;
        padding: 5rem;
        gap: 1rem;
    `

    const FirstContainer = styled.div`
        background-color: ${p => p.theme.primary};
        padding: 3rem;
        border-radius: 10px;
        width: 30%;
        box-shadow: 5px 5px 10px ${p => p.theme.shadow};
    `


    if(isLoading) return <Loading></Loading>
    

    return (
        <div className="view-container">
            <Container>
                <FirstContainer>
                    {/* rating, price, transit or not, duration, number of transits */}
                    <div className="sub-container">
                        <SubTitle>Rating</SubTitle>
                        <FlexGap>
                            <input type="checkbox" />
                            <SubTitle>0 - 3</SubTitle>
                        </FlexGap>
                        <FlexGap>
                            <input type="checkbox" />
                            <SubTitle>3 - 5</SubTitle>
                        </FlexGap>
                        <br /><br />
                    </div>
                    <br />
                    <br />
                    <div className="sub-container">
                        <SubTitle>Price</SubTitle>
                        <Input type="number" placeholder="Minimum"/>
                        <Input type="number" placeholder="Maximum"/>
                    </div>
                    <br />
                    <Button>Update</Button>
                </FirstContainer>
                <div className="hotels-container">
                    {hotels.map((hotel, index) => (
                        <div key={index}>
                            <HotelCard inDetail={false} hotel={hotel}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        
    )
}
