import { v4 } from "uuid";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import IFlight from "../interfaces/flight-interface";
import Seat from "../interfaces/seat-interface";
import ITransit from "../interfaces/transit-interface";
import Service from "../utils/service";
import IFlightSeat from "../interfaces/flight-seat-interface";
import { SeatType } from "../enums/seat-type-enum";
import { IUser } from "../interfaces/user-interface";
import IFlightResponse from "../interfaces/flight-response-interface";
import ICartFlightTicket from "../interfaces/cart-flight-interface";

const service = new Service()

export async function createFlight(flight : IFlight, transits : ITransit[], business : Seat, economy : Seat, firstClass: Seat){
    try {
        flight.FlightID = v4()
        await service.request({
            url: Paths.CREATE_FLIGHT,
            method: Method.POST
        }, '', flight)
        
        for(const t of transits) {
            t.FlightID = flight.FlightID
            t.TransitID = v4()
            console.log(t);
            await service.request({
                url: Paths.CREATE_FLIGHT_TRANSIT,
                method: Method.POST
            }, '', t)
        }
    
        let seatNumber = 1
        for(let i = 0; i < business.Total; i++){ 
            console.log('here');
            const seat : IFlightSeat = {
                FlightSeatID: v4(),
                FlightID : flight.FlightID,
                IsAvalaible: true,
                SeatNumber: seatNumber,
                SeatClass: SeatType.Business,
                Price: business.Price,
            }
            console.log(seat);
            await service.request({
                url: Paths.CREATE_FLIGHTSEAT,
                method: Method.POST
            }, '', seat)
            seatNumber++
        }
    
        for(let i = 0; i < economy.Total; i++){ 
            const seat : IFlightSeat = {
                FlightSeatID: v4(),
                FlightID : flight.FlightID,
                IsAvalaible: true,
                SeatNumber: seatNumber,
                SeatClass: SeatType.Economy,
                Price: business.Price,
            }
            await service.request({
                url: Paths.CREATE_FLIGHTSEAT,
                method: Method.POST
            }, '', seat)
            seatNumber++
        }
    
        for(let i = 0; i < firstClass.Total; i++){ 
            const seat : IFlightSeat = {
                FlightSeatID: v4(),
                FlightID : flight.FlightID,
                IsAvalaible: true,
                SeatNumber: seatNumber,
                SeatClass: SeatType.FirstClass,
                Price: business.Price,
            }
            const response = await service.request({
                url: Paths.CREATE_FLIGHTSEAT,
                method: Method.POST
            }, '', seat)
            seatNumber++
        }
    
        return true 
    } catch (error) {
        console.log(error);
        return false
    }
}

export async function addFlightToCart (user : IUser, flight : IFlightResponse) {
    const cart : ICartFlightTicket = {
        CartID: v4(),
        UserRefer: user.ID,
        FlightRefer: flight.FlightID
    }

    const result = await service.request({
        url: Paths.CREATE_CARTFLIGHTTICKET,
        method: Method.POST
    }, '', cart)

    if(result.message == 'success') return true
    return false
}
