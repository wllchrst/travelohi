import { v4 } from "uuid";
import IPromo from "../interfaces/promo-interface";
import { FirebaseUtil } from "../utils/firebase";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";

const service = new Service()

export async function createPromo(promo : IPromo, pictureFile : File){
    try {
        promo.ID = v4()
        const pictureLink = await FirebaseUtil.PostImage(pictureFile)
        promo.PictureLink = pictureLink
        await service.request({
            url: Paths.CREATE_PROMO,
            method: Method.POST
        }, '', promo)   
        return true
    } catch (error) {
        console.log(error);  
        return false
    }
    
}

export async function deletePromo(promo : IPromo){
    console.log(promo.ID);
    // const result = await service.request({
    //     url: Paths.DELETE_PROMO,
    //     method: Method.DELETE
    // }, promo.ID)

    // if(result.message == 'success') return true
    // return false
}
