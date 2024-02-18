import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Input from "../components/wrapper/input"
import Option from "../components/wrapper/option"
import Select from "../components/wrapper/select"
import { personalQuestion } from "../enums/personal-questions"
import "../styles/register.scss"
import { IUser } from "../interfaces/user-interface"
import Button from "../components/wrapper/button"
import { IEndpoint } from "../interfaces/endpoint-interface"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import Service from "../utils/service"
import { FirebaseUtil } from "../utils/firebase"
import { Link, useNavigate } from "react-router-dom"
import { PrimaryBackground, SecondaryColor } from "../components/wrapper/secondary"
import { FlexGap } from "../components/wrapper/FlexGap"
import { useUserAuth } from "../contexts/user-context"

export default function Register () {
    const [user, setUser] = useState({ IsSubscribed: false } as IUser)
    const [file, setFile] = useState<File>()
    const navigate = useNavigate()
    const userContext = useUserAuth()
    useEffect(() => {
        if(userContext.isAuth()) {
            navigate('/home')
        }
    }, [userContext.user])

    const registerUser = async () => {
        const service = new Service()
        const endpoint : IEndpoint = {
            url : Paths.REGISTER,
            method: Method.POST
        }
        const response = await service.request<IUser>(endpoint, "", user)
        return response
    }

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const submitHandle = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!file) {
            alert("you need to input every field")
            return
        }
        
        FirebaseUtil.PostImage(file).then((url) => {
            user.ProfilePictureLink = url
            registerUser().then((result) => {
                if(result.success) {
                    alert("Register Success")
                    navigate('/login')
                }
                else {
                    alert(result.message)
                }
            })
        })
    }
    return (
        <PrimaryBackground>
            <div className="page-container center">
                <PrimaryBackground className="form-container">
                    <h1>Register</h1>
                    <br />
                    <form onSubmit={submitHandle}>
                        <div className="name-container">
                            <Input placeholder="First Name" type="text" name="FirstName" onChange={changeHandle}></Input>
                            <Input placeholder="Last Name" type="text" name="LastName" onChange={changeHandle}></Input>
                        </div>
                        <div className="name-container">
                            <p>Birthday</p>
                            <Input type="date" name="DOB" onChange={(event) => {
                                setUser({
                                    ...user,
                                    DOB: new Date(event.target.value)
                                })
                                console.log(user);
                            }}></Input>
                        </div>
                        <Input placeholder="example@domain.com" type="text" name="Email" onChange={changeHandle}></Input>
                        <Input placeholder="Password" type="password" name="Password" onChange={changeHandle}></Input>
                        <Input placeholder="Confirm Password" type="password" name="Password" onChange={changeHandle}></Input>
                        <div className="radio-container">
                            <label htmlFor="">
                                <input type="radio" name="Gender" value={"Male"} onChange={changeHandle}/>Male
                            </label>
                            <label htmlFor="">
                                <input type="radio" name="Gender" value={"Female"} onChange={changeHandle}/>Female
                            </label>
                        </div>
                        <div className="name-container">
                            <p>Profile Picture</p>
                            <Input type="file" name="ProfilePictureLink" onChange={(event) => {
                                if(event.target.files){
                                    const currentFile = event.target.files[0]
                                    setFile(currentFile)
                                }
                            }}></Input>
                        </div>
                        <Select name="PersonalSecurityQuestion" id="" onChange={changeHandle} value={personalQuestion[0]}>
                            {personalQuestion.map((question, index) => (
                                <Option value={question} key={index}>{question}</Option>
                            ))}
                        </Select>
                        <Input placeholder="Answer" name="PersonalSecurityAnswer" onChange={changeHandle}></Input>
                        <FlexGap>
                            <input type="checkbox" onChange={() => {
                                setUser({
                                    ...user, 
                                    IsSubscribed: !user.IsSubscribed
                                })
                            }}/>
                            <p>Subscribe to News Letter</p>
                        </FlexGap>
                        <Button type="submit">Register</Button>
                    </form>
                    <div className="center">
                        <Link to={"/login"} className="link underline-effects">Already have an account?</Link>
                    </div>
                </PrimaryBackground>
            </div>
        </PrimaryBackground>
        
    )
}
