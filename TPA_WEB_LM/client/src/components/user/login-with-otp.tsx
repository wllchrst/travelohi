import { useState } from "react";
import Input from "../wrapper/input";
import { SubTitle } from "../wrapper/subtitle";
import Button from "../wrapper/button";
import { GetOTP, loginOtp } from "../../functions/otp";

export default function OTPLogin () {
    const [email, setEmail] = useState('')
    const [otp, setotp] = useState('')
    const [otpSend, setOtpSend] = useState(false)

    const clickHandle = () => {
        GetOTP(email).then((result) => {
            setOtpSend(result)
            
        })
    }

    const otpHandle = () => {
        loginOtp(otp).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col w-50per gap-1">
            <SubTitle>OTP Login</SubTitle>
            {!otpSend ? <>
                <Input placeholder="Email" onChange={(o) => {
                    setEmail(o.target.value)
                }}/>
                <Button onClick={clickHandle}>Get OTP</Button>
            </> : <>
                <Input placeholder="OTP Code" value={otp} onChange={(o) => {
                    setotp(o.target.value)
                }}/>
                <Button onClick={otpHandle}>Login Using OTP</Button>
            </>}
        </div>
    )
}
