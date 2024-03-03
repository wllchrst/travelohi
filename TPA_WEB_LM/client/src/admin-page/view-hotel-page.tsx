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
import IHotelFIlter from "../interfaces/hotel-filter-inteface"
import { FirstContainer } from "../components/wrapper/first-container"
import { Container } from "../components/wrapper/container"
import Select from "../components/wrapper/select"

const service = new Service()

interface I {
    searchHotel : IHotelReponse[] | null
}

export default function ViewHotel ({ searchHotel } : I) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemAmount, setItemAmount] = useState(3)
    const { hotels, isLoading, setFilter, setHotels } = useFecthHotel()
    const [showHotel, setShowHotel] = useState<IHotelReponse[]>([])
    const [update, setUpdate] = useState(false)
    const [currentFilter, setcurrentFilter] = useState<IHotelFIlter>({
        Filtering : false,
        HighRating: false,
        MediumRating: false,
        PriceMaximum: -1,
        PriceMinimum: -1
    })

    useEffect(() => {
        updateShowHotel()
    }, [itemAmount, hotels, searchHotel, update])

    function filterHotel(){
        if(!currentFilter.Filtering) return;
    }
    

    const updateShowHotel = () => {
        if(searchHotel) {
            const startIndex = currentIndex < searchHotel.length ? currentIndex : Math.max(0, searchHotel.length - itemAmount);
            const endIndex = Math.min(startIndex + itemAmount, searchHotel.length);
            setShowHotel(searchHotel.slice(startIndex, endIndex));
        }
        else {
            const startIndex = currentIndex < hotels.length ? currentIndex : Math.max(0, hotels.length - itemAmount);
            const endIndex = Math.min(startIndex + itemAmount, hotels.length);
            setShowHotel(hotels.slice(startIndex, endIndex));
        }
    };
    
    const handleNextPage = () => {
        if (currentIndex + itemAmount < hotels.length) {
            setUpdate(!update)
            setCurrentIndex(currentIndex + itemAmount);
        }
    };
    
    const handlePreviousPage = () => {
        if (currentIndex - itemAmount >= 0) {
            setUpdate(!update)
            setCurrentIndex(currentIndex - itemAmount);
        }
    };

    const clickHandle = () => setFilter(currentFilter)

    if(isLoading) return <Loading></Loading>

    return (
        <div className="view-container">
            <div className="flex p-5 gap-1">
                <FirstContainer>
                    {/* rating, price, transit or not, duration, number of transits */}
                    <div className="sub-container">
                        <SubTitle>Rating</SubTitle>
                        <FlexGap>
                            <input type="checkbox" onChange={() => {
                                setcurrentFilter({
                                    ...currentFilter,
                                    Filtering: true,
                                    MediumRating: !currentFilter.MediumRating
                                })
                            }}/>
                            <SubTitle>0 - 3</SubTitle>
                        </FlexGap>
                        <FlexGap>
                            <input type="checkbox" onChange={() => {
                                setcurrentFilter({
                                    ...currentFilter,
                                    Filtering: true,
                                    HighRating: !currentFilter.HighRating 
                                })
                            }}/>
                            <SubTitle>3 - 5</SubTitle>
                        </FlexGap>
                        <br /><br />
                    </div>
                    <br />
                    <br />
                    <div className="sub-container">
                        <SubTitle>Price</SubTitle>
                        <Input type="number" placeholder="Minimum" onChange={(o) => {
                            setcurrentFilter({
                                ...currentFilter,
                                Filtering: true,
                                PriceMinimum: parseInt(o.target.value),
                            })
                        }}/>
                        <Input type="number" placeholder="Maximum" onChange={(o) => {
                            setcurrentFilter({
                                ...currentFilter,
                                Filtering: true,
                                PriceMaximum: parseInt(o.target.value)
                            })
                        }}/>
                    </div>
                    <br />
                    <Button onClick={clickHandle}>Update</Button>
                </FirstContainer>
                <div className="flex flex-col gap-1">
                    <div className="hotels-container">
                        {showHotel.map((hotel, index) => (
                            <div key={index}>
                                <HotelCard inDetail={false} hotel={hotel}/>
                            </div>
                        ))}
                    </div>
                    <Container className="p-2 flex-row">
                        <FlexGap>
                            <div>
                                <Select onChange={(o) => {
                                    setItemAmount(parseInt(o.target.value))
                                }}>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Select>
                            </div>
                            <div className="flex justify-between gap-1">
                                <Button onClick={() => handlePreviousPage()}>Before</Button>
                                <Button onClick={() => handleNextPage()}>Next</Button>
                            </div>
                        </FlexGap>
                    </Container>
                </div>
            </div>
        </div>
        
    )
}
