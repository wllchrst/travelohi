import { ChangeEvent, useState } from "react";
import Input from "../components/wrapper/input";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import Button from "../components/wrapper/button";


interface Email {
	Subject   :string
	Body      :string
}


export default function SendEmail () {
    const [email, setEmail] = useState({} as Email)
    const service = new Service()

    async function send(){
        const response = await service.request({
            url: Paths.ADMIN_EMAIL,
            method: Method.POST
        }, '', email)

        if(!response.success) alert(response.message)

        return response.success
    }

    const clickHandle = () => {
        console.log(email);
        send().then((result) => {
            if(result) window.location.reload()
        })
    }

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEmail({
            ...email,
            [event.target.name]: event.target.value
        })
    }


    return (
        <div className="center flex-col w-50per gap-1">
            <Input placeholder="Subject" name="Subject" onChange={changeHandle}></Input>
            <Input placeholder="Body" name="Body" onChange={changeHandle}></Input>
            <Button onClick={clickHandle}>Send Email</Button>
        </div>
    )
}
