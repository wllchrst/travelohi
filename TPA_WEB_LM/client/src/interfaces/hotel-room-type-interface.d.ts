import IHotelRoomTypeFacility from "./room-type-facility-interface"
import IHotelRoomTypeFacilityResponse from "./room-type-facility-response-interface"

export default interface IHotelRoomType {
	RoomTypeID  :string 
	HotelID     :string
	Description :string
	PictureLink :string
	Price       :number
	HotelRoomTypeFacilities : IHotelRoomTypeFacilityResponse[]	
}
