import "../styles/view-flights.scss"
import FlightCard from "../components/flights/flight-card"
import Loading from "../components/wrapper/loading"
import { SubTitle } from "../components/wrapper/subtitle"
import { FlexGap } from "../components/wrapper/FlexGap"
import Input from "../components/wrapper/input"
import Button from "../components/wrapper/button"
import useFetchFlight from "../hooks/use-fetch-flights"
import IFlightFilter from "../interfaces/flight-filter-interface"
import { FirstContainer } from "../components/wrapper/first-container"
import { Container } from "../components/wrapper/container"
import { useEffect, useState } from "react"
import IFlightResponse from "../interfaces/flight-response-interface"
import Select from "../components/wrapper/select"
import { filterFlight } from "../functions/flight"

interface I {
    flightSearch : IFlightResponse[] | null
}

export default function ViewFlight ({ flightSearch } : I) {
    const { flights, isLoading } = useFetchFlight();
    const [itemAmount, setItemAmount] = useState(3)
    const [update, setUpdate] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showFlight, setShowFlight] = useState<IFlightResponse[]>([])
    const [filtering, setFiltering] = useState(false)

    const [currentFilter, setCurrentFilter] = useState<IFlightFilter>({
        IsTransit : null,
        Duration: null,
        NumberOfTransit: null,
        PriceMaximum: null,
        PriceMinimum: null
    })

    useEffect(() => {
        updateShowFlight()
    }, [itemAmount, flights, flightSearch, update, filtering])
    
    const updateShowFlight = () => {
        if(flightSearch) {
            const startIndex = currentIndex < flightSearch.length ? currentIndex : Math.max(0, flightSearch.length - itemAmount);
            const endIndex = Math.min(startIndex + itemAmount, flightSearch.length);
            setShowFlight(flightSearch.slice(startIndex, endIndex));
        }
        else if(filtering) {
            const startIndex = currentIndex < showFlight.length ? currentIndex : Math.max(0, showFlight.length - itemAmount);
            const endIndex = Math.min(startIndex + itemAmount, showFlight.length);
            setShowFlight(showFlight.slice(startIndex, endIndex));
        }
        else {
            const startIndex = currentIndex < flights.length ? currentIndex : Math.max(0, flights.length - itemAmount);
            const endIndex = Math.min(startIndex + itemAmount, flights.length);
            setShowFlight(flights.slice(startIndex, endIndex));
        }
        
    };

    const handleNextPage = () => {
        if (currentIndex + itemAmount < flights.length) {
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

    function filterFlightHandle() {
        filterFlight(currentFilter, flights, setShowFlight)
        setFiltering(true)
    }

    if(isLoading == true) return <Loading></Loading>

    return (
        <Container className="p-5">
            <div className="flex gap-2">
                <FirstContainer>
                    <div className="sub-container">
                            <SubTitle>Transit</SubTitle>
                            <FlexGap>
                                <input type="radio" name="transit-type" onChange={() => {
                                    setCurrentFilter({
                                        ...currentFilter,
                                        IsTransit : true
                                    })
                                }}/>
                                <p>Yes</p>
                            </FlexGap>
                            <FlexGap>
                                <input type="radio" name="transit-type" onChange={() => {
                                    setCurrentFilter({
                                        ...currentFilter,
                                        IsTransit : false
                                    })
                                }}/>
                                <p>No</p>
                            </FlexGap>
                            <Input placeholder="Transits" type="number" onChange={(o) => {
                                setCurrentFilter({
                                    ...currentFilter, 
                                    NumberOfTransit: parseInt(o.target.value)
                                })
                            }}></Input>
                            <br /><br />
                            <SubTitle>Duration</SubTitle>
                            <Input type="number" onChange={(o) => {
                                setCurrentFilter({
                                    ...currentFilter,
                                    Duration: parseInt(o.target.value)
                                })
                            }}></Input>
                            <br /><br />
                            <SubTitle>Price</SubTitle>
                            <Input placeholder="Minimum" type="number" onChange={(o) => {
                                setCurrentFilter({
                                    ...currentFilter, 
                                    PriceMinimum: parseInt(o.target.value)
                                })
                            }}></Input>
                            <Input placeholder="Maximum" type="number" onChange={(o) => {
                                setCurrentFilter({
                                    ...currentFilter, 
                                    PriceMaximum: parseInt(o.target.value)
                                })
                            }}></Input>
                            <br /><br />
                            <Button onClick={() => {
                                filterFlightHandle()
                            }}><div className="center">Submit</div></Button>
                        </div>
                        <br />
                        <br />
                </FirstContainer>
                <div className="flex flex-col gap-1 w-100per">
                    <div className="flights-container">
                        {flights ? 
                            <>
                                {showFlight.map((flight, index) => (
                                    <div key={index} className="flights-container">
                                        <FlightCard flight={flight}></FlightCard>
                                    </div>
                                ))}
                            </>
                            : <Loading></Loading>
                        }
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
        </Container>
    )
}
