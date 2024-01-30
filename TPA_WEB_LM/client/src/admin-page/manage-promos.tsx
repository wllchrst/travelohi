import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/wrapper/button";
import { Container } from "../components/wrapper/container";
import Input from "../components/wrapper/input";
import { SubTitle } from "../components/wrapper/subtitle";
import { TextArea } from "../components/wrapper/text-area";
import { Title } from "../components/wrapper/title";
import "../styles/manage-promo.scss"
import IPromo from "../interfaces/promo-interface";
import { getTheFile } from "../game/util";
import { createPromo, deletePromo } from "../functions/promo";
import useFetchPromos from "../hooks/use-fetch-promos";
import Loading from "../components/wrapper/loading";
import { HotelImageDiv } from "../components/wrapper/DivForImage";
import { FlexGap } from "../components/wrapper/FlexGap";
import trashIcon from "../assets/trashIcon.png"


export default function ManagePromos () {
    const { promos, isLoading } = useFetchPromos()
    const [promo, setPromo] = useState<IPromo>({} as IPromo)
    const [file, setFile] = useState<File>()

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPromo({
            ...promo, 
            [event.target.name]: event.target.value
        })
    }

    const submitHandle = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(file) createPromo(promo, file).then((result) => {
            if(result) window.location.reload()
        })
    }


    return (
        <div className="p-5">
            <Container className="p-3">
                {/* update ongoing promos */}
                <div className="display-promo-container flex flex-col">
                    {isLoading ? <Loading></Loading> : 
                    <>
                        {promos.map((promo, index) => (
                            <div key={index} className="promo-card-container gap-3">
                                <div className="w-4k h-2k image-container">
                                    <HotelImageDiv> <img src={promo.PictureLink}></img> </HotelImageDiv>
                                </div>
                                <SubTitle className="mt-1">Promo Code : {promo.PromoCode}</SubTitle>
                                <img onClick={() => deletePromo(promo).then((result) => {
                                    console.log(result);
                                })} className="w-3 h-3" src={trashIcon}></img>
                            </div>
                        ))}
                    </>}
                </div>
                <div className="create-promo-container w-50per mt-2">
                    <form onSubmit={submitHandle}>
                        <Title>Add New Promo</Title>
                        <br />
                        <Input name="PromoCode" onChange={changeHandle} placeholder="Promo Code" ></Input>
                        <Input onChange={(o) => {
                            getTheFile(o, setFile)
                        }} type="file" placeholder="Promo Picture"></Input>
                        <Input onChange={(o) => {
                            setPromo({
                                ...promo,
                                DiscountValue: parseInt(o.target.value)
                            })
                        }} placeholder="Discount Value" type="number"></Input>
                        <Button className="center w-50per"><SubTitle>ADD</SubTitle></Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}
