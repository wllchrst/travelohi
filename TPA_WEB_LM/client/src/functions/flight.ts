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
import IFlightTicket from "../interfaces/flight-ticket-interface";
import IFlightFilter from "../interfaces/flight-filter-interface";

const service = new Service()

export async function createFlight(flight : IFlight, transits : ITransit[], business : Seat, economy : Seat, firstClass: Seat){
    try {
        flight.FlightID = v4()
        const response = await service.request({
            url: Paths.CREATE_FLIGHT,
            method: Method.POST
        }, '', flight)

        if(!response.success) {
            alert(response.message)
            return false
        }    

        for(const t of transits) {
            t.FlightID = flight.FlightID
            t.TransitID = v4()
            const response = await service.request({
                url: Paths.CREATE_FLIGHT_TRANSIT,
                method: Method.POST
            }, '', t)

            console.log(response);
            if(!response.success) {
                alert(response.message)
                return false
            }
        }

        console.log("before ec");
    
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
            const response = await service.request({
                url: Paths.CREATE_FLIGHTSEAT,
                method: Method.POST
            }, '', seat)

            if(!response.success) {
                alert(response.message)
                return false
            }
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
            const response = await service.request({
                url: Paths.CREATE_FLIGHTSEAT,
                method: Method.POST
            }, '', seat)

            console.log("making economy seat");
            console.log(response);

            if(!response.success) {
                alert(response.message)
                return false
            }

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

            if(!response.success) {
                alert(response.message)
                return false
            }
            
            seatNumber++
        }
    
        return true 
    } catch (error) {
        console.log(error);
        return false
    }
}

export async function addFlightToCart (user : IUser, flight : IFlightResponse, flightSeatID : string, extraLuggage : number) {
    const cart : ICartFlightTicket = {
        ExtraLuggage: extraLuggage,
        CartID: v4(),
        UserRefer: user.ID,
        FlightSeatRefer: flightSeatID,
        FlightRefer: flight.FlightID
    }

    const response = await service.request({
        url: Paths.CREATE_CARTFLIGHTTICKET,
        method: Method.POST
    }, '', cart)

    console.log(response);

    if(!response.success)  {
        alert(response.message)
        return false
    }
    return true
}

export async function buyFlight (user : IUser, flightID : string, flightSeatID : string, extraLuggage : number, method : string, cartID : string) {
    const flightTicket : IFlightTicket = {
        TicketID: v4(),
        UserRefer: user.ID,
        FlightRefer: flightID,
        FlightSeatRefer: flightSeatID,
        ExtraLuggage : extraLuggage,
        Method: method
    }

    const response = await service.request({
        url: Paths.CREATE_FLIGHTTICKET + "/" + user.Email,
        method: Method.POST
    }, cartID, flightTicket)

    if(response.success) return true
    else {
        alert(response.message)
        return false
    }
}

export async function removeCartFlight(cartID : string){
    const response = await service.request({
        url: Paths.DELETE_CARTFLIGHTTICKET, 
        method: Method.DELETE
    }, cartID)

    if(response.success) return true
    else {
        alert(response.message)
        return false
    }
}

export async function buyNowFlight(flight : IFlightResponse, extraLuggage : number, seat : IFlightSeat, method : string, user : IUser){
    const ticket : IFlightTicket = {
        TicketID: v4(),
        FlightRefer: flight.FlightID,
        ExtraLuggage: extraLuggage,
        FlightSeatRefer: seat.FlightSeatID,
        Method: method,
        UserRefer: user.ID
    }

    const response = await service.request({
        url: Paths.BUY_FLIGHT,
        method: Method.POST
    }, '', ticket)

    console.log(response);

    if(response.success) return true
    else {
        alert(response.message)
        return false
    }
}

export function filterFlight(filter : IFlightFilter, flights : IFlightResponse[], setFlights : React.Dispatch<React.SetStateAction<IFlightResponse[]>> ) {
    const filteredFlights = flights.filter(flight => {
        // Check if flight has transits if IsTransit filter is provided
        if (filter.IsTransit !== null) {
            const hasTransits = flight.Transits.length > 0;
            if (filter.IsTransit !== hasTransits) {
                return false;
            }
        }

        // Check if flight has the desired number of transits if NumberOfTransit filter is provided
        if (filter.NumberOfTransit !== null) {
            if (flight.Transits.length > filter.NumberOfTransit) {
                return false;
            }
        }

        

        // Add more conditions for other filters as needed
        
        // Example:
        // Check if flight duration is within the specified range
        // if (filter.Duration !== undefined) {
        //     const flightDuration = flight.ArrivalTime - flight.DepartureTime.getTime();
        //     if (flightDuration < filter.Duration) {
        //         return false;
        //     }
        // }

        // Check if flight price is within the specified range
        // if (filter.PriceMinimum !== undefined && filter.PriceMaximum !== undefined) {
        //     const flightPrice = // calculate flight price
        //     if (flightPrice < filter.PriceMinimum || flightPrice > filter.PriceMaximum) {
        //         return false;
        //     }
        // }

        // If the flight passes all the filter conditions, return true
        return true;
    });

    setFlights(filteredFlights)
}
