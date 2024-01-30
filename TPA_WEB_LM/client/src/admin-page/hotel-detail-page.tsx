import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Service from "../utils/service"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import IHotelReponse from "../interfaces/hotel-response-interface"
import Loading from "../components/wrapper/loading"
import HotelDetailCard from "../components/hotels/hotel-detail-card"
import AddRoomType from "../components/hotels/add-room-type"
import { FlexGap } from "../components/wrapper/FlexGap"
import Input from "../components/wrapper/input"
import Button from "../components/wrapper/button"
import useChangeContext from "../hooks/use-change-context"
import { useUserAuth } from "../contexts/user-context"
import { Title } from "../components/wrapper/title"
import { HotelImageDiv } from "../components/wrapper/DivForImage"
import { Container } from "../components/wrapper/container"

export default function HotelDetail () {
    const userContext = useUserAuth()
    const roomsElement = useRef(null)
    const { id } = useParams()
    const [hotel, setHotel] = useState<IHotelReponse | null>(null)
    const service = new Service()
    const { effect } = useChangeContext()

    useEffect(() => {
        service.request<IHotelReponse>({
            url: Paths.GET_HOTEL_DETAIL,
            method: Method.GET
        }, id).then((result) => {
            if(result.data) setHotel(result.data)
            console.log(result.data);
        })
    }, [effect])


    return (
        <div className="detail-container">
            {(!hotel) ? <Loading/> : <>
                <div className="flex flex-col gap-1">
                    <HotelDetailCard  hotel={hotel}></HotelDetailCard>
                    <AddRoomType hotel={hotel}></AddRoomType>
                </div > 
            </>}
        </div>
    )
}
