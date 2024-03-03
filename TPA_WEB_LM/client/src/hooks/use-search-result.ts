import { useEffect, useState } from "react";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import { useUserAuth } from "../contexts/user-context";

export default function useSearchResult (){ 
    const [results, setResult] = useState<string[]>([])
    const [recommendation, setRecommendation] = useState<string[]>([])
    const { user } = useUserAuth()
    const [query, setQuery] = useState('')
    const service = new Service()

    async function fetchRecommendation(){
        console.log("FETCHING RECOMMENDATION SEARCH BAR");
        const response = await service.request<string[]>({
            url: Paths.SEARCH_RECOMMENDATION,
            method: Method.GET
        }, user.Email)

        console.log(response);
        if(response.data) setResult(response.data)
    }

    async function fetchResult(query : string){
        const response = await service.request<string[]>({
            url: Paths.SEARCH_QUERY, 
            method: Method.GET
        }, query);

        console.log(response);
    
        if(response.data) setResult(response.data)
        else setResult([])
    }

    useEffect(() => {
        fetchRecommendation()
    }, [])

    useEffect(() => {
        if(query == '') fetchRecommendation()
        else fetchResult(query)
    }, [query])

    return { setQuery, results, recommendation, query }
}
