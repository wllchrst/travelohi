import { ChangeEvent, FormEvent, useState } from "react"
import IPromo from "../../interfaces/promo-interface"
import Input from "../wrapper/input"
import { getTheFile } from "../../game/util"
import Button from "../wrapper/button"
import { FirebaseError } from "firebase/app"
import { FirebaseUtil } from "../../utils/firebase"
import { updatePromo } from "../../functions/promo"

interface I {
    promo : IPromo
}
export default function UpdatePromo ({ promo } : I) {
    const [updatedPromo, setUpdatedPromo] = useState<IPromo>({} as IPromo)
    const [File, setFile] = useState<File>()

    const changeHandle = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUpdatedPromo({
            ...updatedPromo,
            [event.target.name] : event.target.value
        })
    }

    const submitHandle = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(File) FirebaseUtil.PostImage(File).then((link) => {
            updatedPromo.ID = promo.ID
            updatedPromo.PictureLink = link
            updatePromo(updatedPromo).then((result) => {
                if(result) window.location.reload()
            })
        })
    }

    return (
        <div>
            <form onSubmit={submitHandle}>
                <Input placeholder="Promo Code" name="PromoCode" onChange={changeHandle}></Input>
                <Input type="file" onChange={(o) => {
                    getTheFile(o, setFile)
                }}></Input>
                <Input name="DiscountValue" placeholder="Discount Value" type="number" onChange={changeHandle}></Input>
                <Button>Update</Button>
            </form>
        </div>
    )
}
