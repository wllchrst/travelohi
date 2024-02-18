import { ChangeEvent, FormEvent, useState } from "react"
import { BorderedContainer } from "../components/wrapper/bordered-container"
import { Center } from "../components/wrapper/center"
import Input from "../components/wrapper/input"
import { Title } from "../components/wrapper/title"
import Button from "../components/wrapper/button"
import IAirline from "../interfaces/airline-interface"
import { createAirline } from "../functions/airline"
import { getTheFile } from "../game/util"

export default function CreateAirline () {
    const [airline, setAirline] = useState({} as IAirline)
    const [file, setFile] = useState<File>()

    const submitHandle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(file) createAirline(airline, file).then((result) => {
            if(result) window.location.reload()
        })
    }

    const changeHandle = (event : ChangeEvent<HTMLInputElement>) => {
        setAirline({
            ...airline,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Center className="">
            <BorderedContainer className="form-container ">
                <form onSubmit={submitHandle}>
                    <Title>Create Airline</Title>
                    <Input onChange={changeHandle} name="AirlineCode" placeholder="Airline Code"></Input>
                    <Input onChange={changeHandle} name="AirlineName" placeholder="Airline Name"></Input>
                    <Input type="file" onChange={(event) => {
                        getTheFile(event, setFile)
                    }}></Input>
                    <Button className="center">Create Airline</Button>
                </form>
            </BorderedContainer>
        </Center>
    )
}
