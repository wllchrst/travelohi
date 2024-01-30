import { ChangeEvent } from "react"

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
    return date.toUTCString()
}
export function timeConvert(dateString : Date, hour=0){
    const date = new Date(dateString)
    date.setHours(date.getHours() + hour)
    return date.toTimeString().split(' ')[0]
}

export { createImage, getTheFile }
