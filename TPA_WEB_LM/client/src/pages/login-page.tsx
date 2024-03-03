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
import ReCAPTCHA from 'react-google-recaptcha';
import Modal from "../components/hotels/modal"
import OTPLogin from "../components/user/login-with-otp"
export default function Login() {
    const [user, setUser] = useState({ } as ILoginData)
    const [file, setFile] = useState<File>()
    const navigate = useNavigate()
    const userContext = useUserAuth()
    const [verified, setverified] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleRecaptchaChange = (value : string | null) => {
        // Store the reCAPTCHA value in the component state
        setverified(value != null)
    };

    useEffect(() => {
        if(userContext.isAuth()) {
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
        return response
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
        if(verified == false) {
            alert("Please fill in the recaptcha")
            return
        }
        loginUser().then((result) => {
            if(result.data) {
                Cookies.set("token", result.data)
                navigate("/")
                window.location.reload()
            }
            else alert(result.message)
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
                        <ReCAPTCHA
                            className="w-full"
                            sitekey="6LcEOIEpAAAAAJXLxpXzyXxCCitLILntvgW9RoTc"
                            onChange={handleRecaptchaChange}
                            />
                        <Button type="submit" className="center">Login</Button>
                        <Button onClick={(o) => {
                            o.preventDefault()
                            openModal()
                        }} type="submit" className="center">OTP Login</Button>
                    </form>
                    <div className="center flex-col">
                        <Link to={"/register"} className="link underline-effects">Register New Account</Link>
                        <Link to={"/forgot"} className="link underline-effects red">Forgot Password Account?</Link>
                    </div>
                </PrimaryBackground>
            </div>
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <OTPLogin/>
            </Modal>
        </PrimaryBackground>
        
    )
}
