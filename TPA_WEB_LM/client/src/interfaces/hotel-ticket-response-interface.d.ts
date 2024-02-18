import IHotelReponse from "./hotel-response-interface"
import IHotelRoomType from "./hotel-room-type-interface"
import { IUser } from "./user-interface"

export default interface IHotelTicketResponse {
    TicketID      :string 
	UserRefer     :string
	HotelRefer    :string
	RoomTypeRefer :string
	CheckInDate   :Date
	CheckOutDate  :Date
	Method        :string
	RoomType      : IHotelRoomType
	Hotel         :IHotelReponse 
	User          : IUser          
}
