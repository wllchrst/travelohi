import Cookies from "js-cookie"
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import { useUserAuth } from "../contexts/user-context";

export default function useUserLogout (userId : string){
    const service = new Service();

    const logOut = async () => {
        await service.request({
            url: Paths.LOGOUT,
            method: Method.GET
        }, userId)

        Cookies.remove("token")
        window.location.href = "/login"
    }   

    logOut()
}
