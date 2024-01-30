import styled from "styled-components"
import IHotelReponse from "../../interfaces/hotel-response-interface"
import "../../styles/add-room-type.scss"
import Button from "../wrapper/button"
import { Title } from "../wrapper/title"
import useCurrencyContext from "../../hooks/use-currency-context"
import { ChangeEvent, FormEvent, useState } from "react"
import IHotelRoomType from "../../interfaces/hotel-room-type-interface"
import { createRoomType, deleteRoomType } from "../../functions/hotel"
import Input from "../wrapper/input"
import { FlexGapRoom } from "../wrapper/flex-gap-room"
import { Container } from "../wrapper/container"
import useChangeContext from "../../hooks/use-change-context"
import trashIcon from "../../assets/trashIcon.png"
import { SubTitle } from "../wrapper/subtitle"
import bedIcon from "../../assets/bed-icon.png"
import { FlexGap } from "../wrapper/FlexGap"
import { getTheFile } from "../../game/util"
import { FirebaseUtil } from "../../utils/firebase"
import { FlexGapSmall } from "../wrapper/flex-gap-small"
import { HotelImageDiv } from "../wrapper/DivForImage"
import { DangerButton } from "../wrapper/danger-button"
import { useUserAuth } from "../../contexts/user-context"
import { GreenButton } from "../wrapper/green-button"
import Modal from "./modal"
import AddHotelToCart from "./add-to-cart"
import PriceWrapper from "../wrapper/price-wrapper"

interface IAddRoomTypeCom {
    hotel : IHotelReponse
}

export default function AddRoomType ({hotel} : IAddRoomTypeCom) {
    const { Role } = useUserAuth().user
    const [roomType, setRoomType] = useState<IHotelRoomType>({} as IHotelRoomType)
    const { currencyMultiplier, currencyFront } = useCurrencyContext()
    const [file, setFile] = useState<File>()
    const [facilities, setFacilities] = useState<string[]>([])
    const { changeHappen } = useChangeContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRoom, setcurrentRoom] = useState<IHotelRoomType>({} as IHotelRoomType)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setRoomType({
            ...roomType,
            [event.target.name]: event.target.value
        })
    }

    const handleCheckboxChange = (facilityID : string) => {
        const isFacilitySelected = facilities.includes(facilityID);

        if (isFacilitySelected) {
            setFacilities(facilities.filter((id) => id !== facilityID));
        } else {
            setFacilities([...facilities, facilityID]);
        }
    };


    const submitHandle = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(file) FirebaseUtil.PostImage(file).then((link) => {
            roomType.PictureLink = link
            createRoomType(hotel, roomType, facilities).then((result) => {
                if(result) window.location.reload()
            })
        })
    }

    return (
        <div>
            <Container className="rooms-container">
                <div className="room-types-container">
                    <Title>Room Types</Title>
                    <br />
                    <ul>
                        {hotel.HotelRoomType.map((r, index) => (
                            <FlexGapRoom className="" key={index}>
                                <div className="room-image-container image-container">
                                    <HotelImageDiv>
                                        <img src={r.PictureLink}></img>
                                    </HotelImageDiv>
                                </div>
                                <div className="description-container flex flex-col gap-1">
                                    <div className="flex justify-between item-center">
                                        <Title className="bolder">{r.Description}</Title>
                                        <SubTitle className="red"><PriceWrapper price={r.Price}></PriceWrapper></SubTitle>
                                    </div>
                                    <div className="facility-grid">
                                        {r.HotelRoomTypeFacilities.map((rf, index) => (
                                            <div key={index} className="facility-grid-item">
                                                {rf.Facility.FacilityDescription}
                                            </div>
                                        ))}
                                    </div>
                                    {Role == 'customer' ? <>
                                        <GreenButton  onClick={() => {
                                            setcurrentRoom(r)
                                            openModal()
                                        }}>Add To Cart</GreenButton>
                                    </> : <DangerButton onClick={() => {
                                            deleteRoomType(r).then((result) => {
                                                if(result) window.location.reload()
                                            })
                                        }}>Delete</DangerButton>
                                    }
                                </div>
                            </FlexGapRoom>
                        ))}
                    </ul>
                </div>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <AddHotelToCart roomType={currentRoom} hotel={hotel}></AddHotelToCart>
                </Modal>
                { Role == 'customer' ? <></> : 
                    <FlexGapRoom>
                        <form onSubmit={submitHandle}>
                            <Input name="Description" onChange={changeHandle} placeholder="Room Description"></Input>
                            <Input name="Price" onChange={(o) => {
                                setRoomType({
                                    ...roomType,
                                    [o.target.name]: parseInt(o.target.value)
                                })
                            }} type="number" placeholder="Room Price"></Input>
                            <Input onChange={(event) => {
                                getTheFile(event, setFile)
                            }} type="file"></Input>
                            {hotel.HotelFacilities.map((facility, index) => (
                                <div key={index}>
                                    <FlexGap>
                                        <input onChange={() => {
                                            handleCheckboxChange(facility.FacilityID)
                                        }} type="checkbox" />
                                        <p>{facility.FacilityDescription}</p>
                                    </FlexGap>
                                </div>
                            ))}
                            <Button>Add New Room</Button>
                        </form>
                    </FlexGapRoom> 
                }
            </Container>
        </div>
    )
}
