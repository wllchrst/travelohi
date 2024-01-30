import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IEndpoint } from "../interfaces/endpoint-interface"
import Service from "../utils/service"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import ILocation from "../interfaces/location-interface"
import { Center } from "../components/wrapper/center"
import Input from "../components/wrapper/input"
import "../styles/create-hotel.scss"
import { Title } from "../components/wrapper/title"
import styled from "styled-components"
import { TextArea } from "../components/wrapper/text-area"
import Select from "../components/wrapper/select"
import { BorderedContainer } from "../components/wrapper/bordered-container"
import { SubTitle } from "../components/wrapper/subtitle"
import { getTheFile } from "../game/util"
import Button from "../components/wrapper/button"
import{ createHotel, createImage } from "../functions/hotel"
import IHotel from "../interfaces/hotel-interface"

export default function CreateHotel () {
    const [locations, setLocations] = useState<ILocation[]>([])
    const [first, setFirst] = useState<File>()
    const [second, setSecond] = useState<File>()
    const [third, setThird] = useState<File>()
    const [current, setCurrent] = useState('')
    const [facilities, setFacilities] = useState<string[]>([])
    const [hotel, setHotel] = useState<IHotel>({} as IHotel)
    const service = new Service()
    
    useEffect(() => {
        const endpoint : IEndpoint ={
            url: Paths.GET_LOCATIONS,
            method: Method.GET 
        }

        service.request<ILocation[]>(endpoint).then((result) => {
            if(result.data) setLocations(result.data)
        })
    }, [])

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setHotel({
            ...hotel, 
            [event.target.name]: event.target.value
        })
        console.log(hotel);
    }

    const submitHandle = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(first && second && third) createImage(first, second, third).then((result) => {
            createHotel(hotel, result, facilities).then((result) => {
                console.log(result);
            })
        })
    }
    return (
        <Center className="">
            <BorderedContainer className="form-container">
                <form onSubmit={submitHandle}>
                    <Title>Create Hotel</Title>
                    <Input onChange={changeHandle} name="HotelName" placeholder="Name"></Input>
                    <TextArea onChange={changeHandle} name="Description" rows={5} placeholder="Description"></TextArea>
                    <Select name="LocationID" id="" onChange={changeHandle}>
                        <option value="">Choose Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location.LocationID}>{`${location.CityName}, ${location.CountryName}`}</option>
                        ))}
                    </Select>
                    <br />
                    <SubTitle>Add Pictures</SubTitle>
                    <Input type="file" onChange={(event) => {
                        getTheFile(event, setFirst)
                    }}></Input>
                    <Input type="file" onChange={(event) => {
                        getTheFile(event, setSecond)
                    }}></Input>
                    <Input type="file" onChange={(event) => {
                        getTheFile(event, setThird)
                    }}></Input>
                    <SubTitle>Add Facilities</SubTitle>
                    <ul>
                        {facilities.map((fa, index) => (
                            <li key={index} className="list">{fa}</li>
                        ))}
                    </ul>
                    <Input value={current} placeholder="...new shit" onChange={(event) => {
                        setCurrent(event.target.value)
                    }}></Input>
                    <Button onClick={(event) => {
                        event.preventDefault()
                        setFacilities([...facilities, current])
                        setCurrent('')
                    }}>Add New Facilities</Button>
                    <Button type="submit">Add New Hotel</Button>
                </form>
            </BorderedContainer>
        </Center>
    )
}
