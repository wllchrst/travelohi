import { Link, useNavigate } from "react-router-dom";
import { PrimaryBackground } from "../components/wrapper/secondary";
import "../styles/register.scss" 
import Input from "../components/wrapper/input";
import Button from "../components/wrapper/button";
import { ChangeEvent, FormEvent, useState } from "react";
import Service from "../utils/service";
import { IUser } from "../interfaces/user-interface";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import { SubTitle } from "../components/wrapper/subtitle";
import { personalQuestion } from "../enums/personal-questions";
import Select from "../components/wrapper/select";


interface UpdatePasswordInput {
	Email                    :string
	PersonalSecurityAnswer :string
	PersonalSecurityQuestion :string
	NewPassword              :string
	ConfirmNewPassword       :string
}


export default function ForgoutAccount () {
    const service = new Service()
    const [email, setEmail] = useState('')
    const [update, setUpdate] = useState({ } as UpdatePasswordInput)
    const [user, setUser] = useState<IUser>()
    const navigate = useNavigate()

    const updateHandle= (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        service.request({
            url: Paths.UPDATE_PASSWORD,
            method: Method.PATCH
        }, '', update).then((result) => {
            if(result.success) navigate('/login')
            else {
                alert(result.message)
            }
        })
    }

    const submitHandle = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        service.request<IUser>({
            url: Paths.GET_USER_DETAIL,
            method: Method.GET
        }, email).then((result) => {
            console.log(result.data);
            if(result.data) setUser(result.data)
        })
    }

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUpdate({
            ...update, 
            Email: email,
            [event.target.name] : event.target.value
        })
        console.log(update);
    }

    return (
        <PrimaryBackground>
            <div className="page-container center">
                <PrimaryBackground className="form-container shadow">
                    <h1>Forgot Account</h1>
                    <br />
                    {!user ? <form onSubmit={submitHandle}>
                        <Input placeholder="Email" onChange={(o) => setEmail(o.target.value)}/>
                        <Button>Find Account</Button>
                    </form> : <>
                        <form onSubmit={updateHandle}>
                            <SubTitle>{user.PersonalSecurityQuestion}?</SubTitle>
                            <Select name="PersonalSecurityQuestion" id="" onChange={changeHandle}>
                                <option value="">Choose Personality Question</option>
                                {personalQuestion.map((question, index) => (
                                    <option value={question} key={index}>{question}</option>
                                ))}
                            </Select>
                            <Input name="PersonalSecurityAnswer" placeholder="Personal Security Answer" onChange={changeHandle}/>
                            <Input name="NewPassword" placeholder="New Password" type="password" onChange={changeHandle}/>
                            <Input name="ConfirmNewPassword" placeholder="Confirm New Password" type="password" onChange={changeHandle}/>
                            <Button>Update Password</Button>
                        </form>
                    </>}
                    
                    <div className="center flex-col">
                        <Link to={"/register"} className="link underline-effects">Register New Account</Link>
                        <Link to={"/forgot"} className="link underline-effects red">Forgot Password Account?</Link>
                    </div>
                </PrimaryBackground>
            </div>
        </PrimaryBackground>
        
    )
}
