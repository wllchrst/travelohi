import { useEffect, useState } from "react";
import Service from "../utils/service";
import ICreditCard from "../interfaces/credit-card-interface";
import Paths from "../enums/api-paths";


export default function useFetchCredit(){
    const [isLoading, setisLoading] = useState(true)
    const [creditCard, setcreditCard] = useState<ICreditCard[]>([])
    const service = new Service();
    

    function fetchCredit(){
        const response = service.request<ICreditCard[]>({
            url: Paths.VIEW_ALL_CREDITCARD
        })
    }

    useEffect(() => {
    }, [])
    
}
