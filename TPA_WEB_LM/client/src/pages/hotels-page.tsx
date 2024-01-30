import ViewHotel from "../admin-page/view-hotel-page"
import HotelCard from "../components/hotels/hotel-card"
import Loading from "../components/wrapper/loading"
import useFecthHotel from "../hooks/use-fetch-hotels"

export default function Hotels () {
    const { hotels, isLoading } = useFecthHotel()

    if(isLoading) return <Loading></Loading>

    return (
        <ViewHotel></ViewHotel>
    )
}
