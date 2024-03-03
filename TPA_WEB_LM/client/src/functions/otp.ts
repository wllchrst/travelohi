import Cookies from "js-cookie";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import Service from "../utils/service";

const service = new Service();

export async function GetOTP(email : string){
    const response = await service.request({
        url: Paths.GET_OTP,
        method: Method.GET
    }, email)

    console.log(response);

    if(!response.success) alert(response.message)

    return response.success
}

export async function loginOtp(code : string){
    const response = await service.request<string>({
        url: Paths.OTP_LOGIN,
        method: Method.GET
    }, code)


    if(!response.success) alert(response.message)

    if(response.data) Cookies.set("token", response.data)

    return response.success
}
