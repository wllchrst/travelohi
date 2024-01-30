import Cookies from "js-cookie"

export default function useUserLogout (){
    const logOut = () => {
        Cookies.remove("token")
        window.location.href = "/login"
    }   

    logOut()
}
