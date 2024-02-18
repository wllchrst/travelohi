import IHotel from "../interfaces/hotel-interface";
import { FirebaseUtil } from "../utils/firebase";
import { v4 } from "uuid"
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import IHotelPicture from "../interfaces/hotel-picture-interface";
import IHotelFacility from "../interfaces/hotel-facilities-interface";
import { compileString } from "sass";
import IHotelReponse from "../interfaces/hotel-response-interface";
import IHotelRoomType from "../interfaces/hotel-room-type-interface";
import IHotelRoomTypeFacility from "../interfaces/room-type-facility-interface";
import { IUser } from "../interfaces/user-interface";
import ICartHotelTicket from "../interfaces/cart-hotel-interface";
import UpdateHotelCart from "../interfaces/update-hotel-interface";
import ICartHotelTicketResponse from "../interfaces/cart-hotel-response-interface";
import IHotelTicket from "../interfaces/hotel-ticket-interface";

const service = new Service()

export async function createHotel(hotel : IHotel, pictures : string[], facilities : string[]){
    try {
        hotel.HotelID = v4()
        const response = await service.request({
            url: Paths.CREATE_HOTEL,
            method: Method.POST
        }, '', hotel)
        console.log(response);

        if(!response.success) {
            alert(response.message)
            return false
        }
        const len = pictures.length
        console.log(len);

        for(let i = 0; i < len; i++) {
            console.log('CREATING');
            const hotelPicture : IHotelPicture = {
                HotelID: hotel.HotelID,
                PictureID: v4(),
                PictureLink: pictures[i]
            } 
            const response =  await service.request({
                    url: Paths.CREATE_HOTEL_PICTURE,
                    method: Method.POST
                }, '', hotelPicture)
            
            if(!response.success) {
                console.log(response);
                alert(response.message)
                return false
            }
        }

        for(const facility of facilities) {
            const hotelFacility : IHotelFacility= {
                HotelID: hotel.HotelID,
                FacilityDescription: facility,
                FacilityID: v4()
            } 
            const response = await service.request({
                    url: Paths.CREATE_HOTEL_FACILITY,
                    method: Method.POST
                }, '', hotelFacility)

            if(!response.success) {
                alert(response.message)
                return false
            }
        }
        return true
    } catch (error) {
        console.log(error);
        return false
    }
    
}

export async function createImage(first : File, second : File, third : File){
    const pictureLinks : string[] = []
    let link = await FirebaseUtil.PostImage(first)
    pictureLinks.push(link)
    link = await FirebaseUtil.PostImage(second)
    pictureLinks.push(link)
    link = await FirebaseUtil.PostImage(third)
    pictureLinks.push(link)

    console.log(pictureLinks);
    return pictureLinks
}

export async function createRoomType (hotel : IHotelReponse, roomType : IHotelRoomType, facilities : string[]){

    try {
        roomType.HotelID = hotel.HotelID
        roomType.RoomTypeID = v4()

        const response = await service.request({
            url: Paths.CREATE_HOTEL_ROOM_TYPE,
            method: Method.POST
        }, '', roomType)

        console.log(response);

        if(!response.success) {
            alert(response.message)
            return false
        }

        for(const facility of facilities) {
            const fac : IHotelRoomTypeFacility= {
                RoomTypeFacilityID: v4(),
                RoomTypeRefer: roomType.RoomTypeID,
                FacilityID: facility
            }
            const response = await service.request({
                url: Paths.CREATE_HOTELROOMTYPEFACILITY,
                method: Method.POST
            }, '', fac)

            if(!response.success) {
                alert(response.message)
                return response.success
            }
        }   
        return true
    } catch (error) {
        console.log(error);    
        return false
    }
    

}

export async function deleteRoomType (roomType : IHotelRoomType) {
    // for(const facility of roomType.HotelRoomTypeFacilities) {
    //     await service.request({
    //         url: Paths.DELETE_HOTELROOMTYPEFACILITY,
    //         method: Method.DELETE
    //     }, facility.RoomTypeFacilityID)
    // }
    const response = await service.request({
        url: Paths.DELETE_ROOM_TYPE,
        method: Method.DELETE
    }, roomType.RoomTypeID)

    if(response.message == 'success') return true
    return false
}

export async function addHotelToCart(hotel : IHotelReponse, roomType : IHotelRoomType, user : IUser, checkIn : Date, checkOut : Date) {
    const cart : ICartHotelTicket = {
        CartID: v4(),
        UserRefer: user.ID,
        HotelRefer: hotel.HotelID,
        RoomTypeRefer: roomType.RoomTypeID,
        CheckInDate: checkIn,
        CheckOutDate: checkOut
    }

    const result = await service.request({
        url: Paths.CREATE_CARTHOTELTICKET,
        method: Method.POST
    }, '', cart)

    if(result.success) return true
    else {
        alert(result.message)
        return false
    }
}

export async function updateHotelCart(updateHotel : UpdateHotelCart, cartID : string) {
    const response = await service.request({
        url: Paths.UPDATE_CARTHOTELTICKET,
        method: Method.PATCH
    }, cartID, updateHotel)

    if(response.success) return true
    else {
        alert(response.message)
        return false
    }
}

export async function buyHotelTicket(cart : ICartHotelTicketResponse, method : string){
    const ticket : IHotelTicket = {
        TicketID: v4(),
        CheckInDate: cart.CheckInDate,
        CheckOutDate: cart.CheckOutDate,
        HotelRefer: cart.HotelRefer,
        Method: method,
        RoomTypeRefer: cart.RoomTypeRefer,
        UserRefer: cart.UserRefer
    }

    const response = await service.request({
        url: Paths.CREATE_HOTELTICKET,
        method: Method.POST
    }, cart.CartID, ticket)


    if(response.success) return true 
    else {
        alert(response.message)
        return false
    }
}

export async function buyNowHotel(hotel : IHotelReponse, method : string, roomType : IHotelRoomType, checkIn : Date, checkOut : Date, user : IUser){
    const ticket : IHotelTicket = {
        TicketID: v4(),
        CheckInDate: checkIn,
        CheckOutDate: checkOut,
        HotelRefer: hotel.HotelID,
        Method: method,
        RoomTypeRefer: roomType.RoomTypeID,
        UserRefer: user.ID
    }

    const response = await service.request({
        url: Paths.BUY_HOTEL,
        method: Method.POST
    }, '', ticket)

    console.log(response);

    if(response.success) return true
    else {
        alert(response.message)
        return false
    }
}
