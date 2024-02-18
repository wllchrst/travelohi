import { v4 } from "uuid";
import IHotelReponse from "../interfaces/hotel-response-interface";
import IRating from "../interfaces/rating-interface";
import { IUser } from "../interfaces/user-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import IReview from "../interfaces/review-interface";
import ICreditCard from "../interfaces/credit-card-interface";


const service = new Service()

export async function createRating(user : IUser, hotel : IHotelReponse, rate : number){
    const rating : IRating = {
        RatingID: v4(),
        UserID: user.ID,
        HotelID: hotel.HotelID,
        Rate: rate
    }

    const response = await service.request({
        url: Paths.CREATE_RATING,
        method: Method.POST
    }, '', rating)

    console.log(response);

    if(!response.success) return false
    return true
}

export async function createReview(user : IUser, hotel : IHotelReponse, review : string, IsAnonymous : boolean){
    const createReview : IReview = {
        ReviewID: v4(),
        UserID : IsAnonymous ? "Anonymous" : user.ID,
        HotelID: hotel.HotelID,
        ReviewDescription: review,
        IsAnonymous: IsAnonymous
    } 

    const response = await service.request({
        url: Paths.CREATE_REVIEW,
        method: Method.POST
    }, '', createReview)

    console.log(response);

    if(!response.success) return false

    return true
}

export async function createCreditCart(user : IUser, cc : ICreditCard){
    cc.UserRefer = user.ID
    cc.CreditCardID = v4()

    const response = await service.request({
        url: Paths.CREATE_CREDITCARD,
        method: Method.POST
    }, '', cc)

    if(!response.success) alert(response.message)

    return response.success
}
