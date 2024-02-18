import { ChangeEvent } from "react"
import IHotelReponse from "../interfaces/hotel-response-interface"

const createImage = (url : string) => {
    const image = new Image()
    image.src = url
    return image
}

const getTheFile = (event : ChangeEvent<HTMLInputElement>, setFile : React.Dispatch<React.SetStateAction<File | undefined>>) => {
    if(event.target.files){
        const currentFile = event.target.files[0]
        setFile(currentFile)
    }
}

export function dateConvert(dateString : Date){
    const date = new Date(dateString)
    const returnString = date.toUTCString().split(' ')
    return returnString[0] + " " +  returnString[1] + " " + returnString[2] + " " + returnString[3]
}

export function timeConvert(dateString : Date, minutes=0){
    const date = new Date(dateString)
    const resultDate = new Date(date.getTime() + minutes * 60000); // 1 minute = 60,000 milliseconds
    return resultDate.toTimeString().split(' ')[0]
}

export function convertMinutesToHoursAndMinutes(minutes : number) {
    console.log(minutes);
    if (typeof minutes !== 'number' || isNaN(minutes)) {
        throw new Error('Input must be a valid number');
    }

    if (minutes < 0) {
        throw new Error('Input must be a non-negative number');
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;


    return `${hours}H ${remainingMinutes}M`;
}

export function getDaysDifference(date1 : Date, date2 : Date) {
    date1 = new Date(date1)
    date2 = new Date(date2)

    var date1_ms = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var date2_ms = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date2_ms - date1_ms);

    // Convert the difference in milliseconds to days
    var difference_days = Math.ceil(difference_ms / (1000 * 60 * 60 * 24));

    return difference_days;
}

export function isDateInPast(date : Date) {
    // Convert the input date to a Date object

    const inputDate = new Date(date);

    // Get the current date
    const currentDate = new Date();

    // Check if the input date is less than the current date
    return inputDate < currentDate;
}

export function calculateRating(hotel : IHotelReponse){
    var total = 0
    for(const rating of hotel.Ratings) {
        total += rating.Rate
    }

    return total /= hotel.Ratings.length
}

export { createImage, getTheFile }
