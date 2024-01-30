import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import IAirline from "../interfaces/airline-interface";
import { FirebaseUtil } from "../utils/firebase";
import Service from "../utils/service";

const service = new Service()

export const createAirline = async (airline : IAirline, file : File) => {
    const link = await FirebaseUtil.PostImage(file)
    airline.PictureLink = link
    try {
        await service.request({
            url: Paths.CREATE_AIRLINE,
            method: Method.POST
        }, '', airline)   

        return true
    } catch (error) {
        return false
    }
}
