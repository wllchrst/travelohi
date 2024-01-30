import IHotelFacility from "./hotel-facilities-interface"
import IHotelPicture from "./hotel-picture-interface"
import IHotelRoomType from "./hotel-room-type-interface"
import ILocation from "./location-interface"
import ITransit from "./transit-interface"

export default interface IHotelReponse {
    HotelID : string
    HotelName : string
    Description : string
    LocationID : string
    Location : ILocation
    HotelPictures: IHotelPicture[]
    HotelFacilities: IHotelFacility[]
    HotelRoomType   : IHotelRoomType[]
}
