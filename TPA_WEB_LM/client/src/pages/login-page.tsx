import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Input from "../components/wrapper/input"
import Option from "../components/wrapper/option"
import Select from "../components/wrapper/select"
import { personalQuestion } from "../enums/personal-questions"
import "../styles/register.scss"
import { ILoginData, IUser } from "../interfaces/user-interface"
import Button from "../components/wrapper/button"
import { IEndpoint } from "../interfaces/endpoint-interface"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import Service from "../utils/service"
import { FirebaseUtil } from "../utils/firebase"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useUserAuth } from "../contexts/user-context"
import { PrimaryBackground, SecondaryColor } from "../components/wrapper/secondary"
import { Title } from "../components/wrapper/title"
import { BorderedContainer } from "../components/wrapper/bordered-container"
import useFetchUser from "../hooks/use-fetch-user"

export default function Login() {
    const [user, setUser] = useState({ } as ILoginData)
    const [file, setFile] = useState<File>()
    const navigate = useNavigate()
    const userContext = useUserAuth()
    useEffect(() => {
        console.log(userContext.isAuth());
        if(userContext.isAuth()) {
            useFetchUser()
            console.log('here');
            navigate('/home')
        }
    }, [userContext.user])
    

    const loginUser = async () => {
        const service = new Service()
        const endpoint : IEndpoint = {
            url : Paths.LOGIN,
            method: Method.POST
        }
        const response = await service.request<string>(endpoint, "", user)
        return response.data
    }

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        console.log(user);
    }

    const submitHandle = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginUser().then((result) => {
            if(result) {
                Cookies.set("token", result)
                navigate("/home")                
            }
            else alert("Invalid Credential")
        })
    }

    return (
        <PrimaryBackground>
            <div className="page-container center">
                <PrimaryBackground className="form-container shadow">
                    <h1>Login</h1>
                    <br />
                    <form onSubmit={submitHandle}>
                        <Input placeholder="example@domain.com" type="text" name="Email" onChange={changeHandle}></Input>
                        <Input placeholder="Password" type="password" name="Password" onChange={changeHandle}></Input>
                        <Button type="submit" className="center">Login</Button>
                    </form>
                    <div className="center">
                        <Link to={"/register"} className="link underline-effects">Register New Account</Link>
                    </div>
                </PrimaryBackground>
            </div>
        </PrimaryBackground>
        
    )
}
